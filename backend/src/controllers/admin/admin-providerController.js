const providerModel  = require('../../models/providerModel');
const userModel = require('../../models/usersModel');
const reportModel = require('../../models/reportModel');
const reviewModel = require('../../models/reviewModel');
const serviceModel = require('../../models/serviceModel');
const categoryModel = require('../../models/categoryModel')

//get all user
const getAllUsers = async (req,res) => {
    try {
        const users = await userModel.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// update user active status
const updateActiveStatus = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = !user.isActive;

    await user.save();

    return res.status(200).json({ 
      message: "Status updated successfully", 
      user 
    });

  } catch (error) {
    return res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};



// get all providers
const getAllProviders = async (req, res) => {
    try {
        const providers = await providerModel
            .find({})
            .select('businessName verificationStatus providerImage address userId categoryId') 
            .populate('userId', 'email ')
            .populate('categoryId', 'name');

        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


// get provider by id
const getProviderById = async (req,res) => {
    try {
        const providerId = req.params.id;
        const provider = await providerModel.findById(providerId)
        .populate({
                path: 'userId',
                select: 'name email address profileImage' 
            })
            .populate({
                path: 'categoryId',
                select: 'name'
            });
        if(!provider){
          return  res.status(404).json({message : "provider not found"})
        }
        res.status(200).json(provider);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
const updateProvider = async (req, res) => {
    try {
        const providerId = req.params.id;
        const { verificationStatus, accountRejectionReason } = req.body;

        const provider = await providerModel.findById(providerId);
        if (!provider) {
            return res.status(404).json({ message: "Provider not found" });
        }

        provider.verificationStatus = verificationStatus;

        if (verificationStatus === 'rejected') {
            if (!accountRejectionReason || !accountRejectionReason.trim()) {
                return res.status(400).json({ message: "Rejection reason is required when rejecting an account." });
            }
            provider.accountRejectionReason = accountRejectionReason.trim();
        } else if (verificationStatus === 'approved') {
            provider.accountRejectionReason = null;
        }

        await provider.save();

        res.status(200).json({
            message: `Provider status updated to ${verificationStatus} successfully`,
            provider
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
// approve payment
const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 

    const provider = await providerModel.findById(id);
    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider not found.' });
    }

    const paymentType = (provider.paymentDetails?.paymentType || '').toLowerCase().trim();

    if (status === 'approve') {
      if (paymentType === 'registration') {
        provider.registrationFee = 'paid';
      } else if (paymentType === 'premium' || paymentType === 'subscription') {
        
        if (!provider.subscriptionDetails) {
          provider.subscriptionDetails = {};
        }

        const planId = provider.subscriptionDetails?.planId || 'monthly';
        const now = new Date();
        let expiryDate = new Date();

        if (planId === 'monthly') {
          expiryDate.setMonth(now.getMonth() + 1);
        } else if (planId === 'quarterly') {
          expiryDate.setMonth(now.getMonth() + 3);
        } else if (planId === 'yearly') {
          expiryDate.setFullYear(now.getFullYear() + 1);
        }

        provider.isPremium = true;
        provider.subscriptionDetails.status = 'active';
        provider.subscriptionDetails.activatedAt = now;
        provider.subscriptionDetails.expiresAt = expiryDate;

        provider.markModified('subscriptionDetails');
      }
    } else if (status === 'reject') {
      if (paymentType === 'registration') {
        provider.registrationFee = 'unpaid';
      } else if (paymentType === 'premium' || paymentType === 'subscription') {
        provider.isPremium = false;
        if (!provider.subscriptionDetails) {
          provider.subscriptionDetails = {};
        }
        provider.subscriptionDetails.status = 'rejected';
        provider.markModified('subscriptionDetails');
      }
    }

    // Clear active pending slip details
    provider.paymentDetails = {
      paymentType: null,
      paymentSlip: null,
      submittedAt: null
    };
    provider.markModified('paymentDetails');

    await provider.save();

    return res.status(200).json({
      success: true,
      message: `Provider ${paymentType || 'payment'} request has been ${status === 'approve' ? 'approved' : 'rejected'} successfully!`,
      data: provider
    });

  } catch (error) {
    console.error('Approve Payment Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error updating payment status.',
      error: error.message 
    });
  }
};
const getPendingPaymentRequests = async (req, res) => {
  try {
    const pendingProviders = await providerModel.find({
      'paymentDetails.paymentSlip': { $ne: null }
    })
      .select('businessName categoryId providerImage registrationFee isPremium paymentDetails subscriptionDetails createdAt')
      .populate('userId', 'name email phone')
      .populate('categoryId', 'name');

    return res.status(200).json({
      success: true,
      count: pendingProviders.length,
      data: pendingProviders
    });
  } catch (error) {
    console.error('Get Pending Payments Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching pending payments.',
      error: error.message 
    });
  }
};

//get all reports for providers
const getAllReports = async (req,res) => {
    try {
        const reports = await reportModel.find().populate('reporterId', 'name').populate('providerId', 'businessName');
        res.status(200).json(reports);
    }   catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

//resolve report 
const resolveReport = async (req,res) => {
    try {
        const { id } = req.params;
        const updatedReport = await reportModel.findByIdAndUpdate(
      id,
      { status: 'resolved' },
      { returnDocument: 'after' }
    );
    res.status(200).json({ message: 'Report resolved successfully', report: updatedReport });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
const deleteReport = async (req,res) => {
    try {
        const { id } = req.params;
        const deletedReport = await reportModel.findByIdAndDelete(id);
        if (!deletedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json({ message: 'Report deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

}

// Get Single Provider Full Details for Admin
const getProviderDetails = async (req, res) => {
    try {
        const providerId = req.params.id;
       const [provider, services, reviews] = await Promise.all([
            providerModel.findById(providerId).populate('userId', 'name email profileImage').populate('categoryId', 'name'), 
            serviceModel.find({ providerId }),
            reviewModel.find({ providerId }).populate('userId', 'name email ')
        ]);


        if (!provider) {
            return res.status(404).json({ message: 'Provider not found' });
        }

        res.status(200).json({
            provider,
            services: services || [],
            reviews: reviews || []
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getAllProviders,
    getProviderById,
    getProviderDetails,
    getPendingPaymentRequests,
    updateActiveStatus,
    updatePayment,
    updateProvider,
    getAllReports,
    resolveReport,
    deleteReport
}