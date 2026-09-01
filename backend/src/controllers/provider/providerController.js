const providerModel = require('../../models/providerModel'); 
const userModel = require('../../models/usersModel');  
const settingModel = require('../../models/settingModel');
const serviceModel = require('../../models/serviceModel');
const bookingModel = require('../../models/bookingModel');
const reviewModel = require('../../models/reviewModel');
const notificationModel = require('../../models/notificationModel');
const mongoose = require('mongoose');

const getProviderDashboardStats = async (req, res) => {
  try {
   const {providerId} = req.body;
    const provider = await providerModel.findById(providerId);
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider profile not found.'
      });
    }

    const [
      totalServices,
      activeBookings,
      totalReviewsCount,
      ratingData,
      ongoingBookings,
      unreadNotificationsCount
    ] = await Promise.all([
      serviceModel.countDocuments({ providerId }),

      bookingModel.countDocuments({
        providerId,
        status: { $nin: ['completed', 'cancelled', 'rejected'] }
      }),

      reviewModel.countDocuments({ providerId }),

      reviewModel.aggregate([
        { $match: { providerId: new mongoose.Types.ObjectId(providerId) } },
        {
          $group: {
            _id: null,
            avgRating: { $avg: '$rating' }
          }
        }
      ]),

      bookingModel.find({
        providerId,
        status: 'accepted'
      })
        .populate('userId', 'name profileImage phone')
        .populate('serviceId', 'title price')
        .sort({ createdAt: -1 }),

      notificationModel.countDocuments({
        recipientId: { $in: [providerId] },
        isRead: false
      })
    ]);

    const averageRating = ratingData.length > 0 ? Number(ratingData[0].avgRating.toFixed(1)) : 0;

    return res.status(200).json({
      success: true,
      data: {
        notifications: {
          hasUnread: unreadNotificationsCount > 0,
          unreadCount: unreadNotificationsCount
        },
        stats: {
          totalServices,
          activeBookings,
          totalReviews: totalReviewsCount,
          averageRating
        },
        ongoingBookings
      }
    });

  } catch (error) {
    console.error('Error fetching Provider Dashboard stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard metrics.',
      error: error.message
    });
  }
};


const registerProvider = async (req, res) => {
  try {
    const { 
      userId, 
      businessName, 
      description, 
      cnicNumber, 
      address, 
      categoryId, 
      experience 
    } = req.body;

    const providerImage = req.files?.['providerImage'] 
      ? req.files['providerImage'][0].path 
      : null;

    const cnicFront = req.files?.['cnicFront'] ? req.files['cnicFront'][0].path : null;
    const cnicBack = req.files?.['cnicBack'] ? req.files['cnicBack'][0].path : null;
    
    const cnicImages = [];
    if (cnicFront) cnicImages.push(cnicFront);
    if (cnicBack) cnicImages.push(cnicBack);

    const workImages = req.files?.['workImages'] 
      ? req.files['workImages'].map(f => f.path) 
      : [];

    let existingProvider = await providerModel.findOne({ userId });

    if (!businessName || !cnicNumber || !categoryId || (!providerImage && !existingProvider?.providerImage)) {
      return res.status(400).json({ 
        success: false, 
        message: "Required fields or profile image missing." 
      });
    }

    if (existingProvider) {
      existingProvider.businessName = businessName;
      existingProvider.description = description || existingProvider.description;
      existingProvider.cnicNumber = cnicNumber;
      existingProvider.address = address || existingProvider.address;
      existingProvider.categoryId = categoryId;
      existingProvider.experience = Number(experience) || existingProvider.experience;
      
      if (providerImage) existingProvider.providerImage = providerImage;
      if (cnicImages.length > 0) existingProvider.cnicImages = cnicImages;
      if (workImages.length > 0) existingProvider.workImages = workImages;

      existingProvider.verificationStatus = 'pending';
      existingProvider.accountRejectionReason = null;

      await existingProvider.save();

      return res.status(200).json({ 
        success: true, 
        message: "Application re-submitted successfully. Pending admin review.",
        data: existingProvider 
      });
    }

    const newProvider = new providerModel({
      userId,
      businessName,
      description, 
      cnicNumber,
      cnicImages,
      providerImage,
      workImages, 
      address,
      categoryId,
      experience: Number(experience) || 0,
      verificationStatus: 'pending',
      accountRejectionReason: null
    });

    await newProvider.save();

    return res.status(201).json({ 
      success: true, 
      message: "Application submitted successfully. Pending admin review.",
      data: newProvider 
    });

  } catch (error) {
    console.error("Provider Registration Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server Error", 
      error: error.message 
    });
  }
};


 const updateProviderProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { 
      name, 
      phone, 
      address, 
      description, 
      experience 
    } = req.body;

    const user = await userModel.findById(userId);
    const provider = await providerModel.findOne({ userId });

    if (!user || !provider) {
      return res.status(404).json({ 
        success: false, 
        message: "Provider record not found." 
      });
    }

    if (phone !== undefined) user.phone = phone;

    if (name !== undefined) provider.businessName = name;
    if (address !== undefined) provider.address = address;
    if (description !== undefined) provider.description = description;
    if (experience !== undefined) provider.experience = experience;
     if (req.file) {
      provider.providerImage = req.file.path;
    }

    await user.save();
    await provider.save();

    const updatedProvider = await providerModel.findOne({ userId })
      .populate('categoryId', 'name')
      .populate('userId', 'phone email name');

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      providerInfo: updatedProvider,
      userPhone: updatedProvider.userId.phone,
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: error.message || "Internal server error." 
    });
  }
};


const getPaymentDetails = async (req, res) => {
  try {
    const settings = await settingModel.findOne();

    if (!settings) {
      return res.status(404).json({ 
        success: false, 
        message: "System settings not found" 
      });
    }

    const registrationFeeAmount = settings?.feeConfig?.registrationFee ;
    const isRegistrationFree = settings?.feeConfig?.isRegistrationFree ;
    const activePaymentAccounts = settings?.paymentAccounts?.filter(acc => acc.isActive) || [];

    return res.status(200).json({
      success: true,
      registrationFeeAmount,
      isRegistrationFree,
      activePaymentAccounts
    });

  } catch (error) {
    console.error("Fetch Payment Details Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error while fetching payment details" 
    });
  }
};


// payment setup
const submitPaymentSlip = async (req, res) => {
  try {
    const { providerId, paymentType, planId, planTitle } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, message: 'Payment slip image is required.' });
    }

    const provider = await providerModel.findById(providerId);
    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider profile not found.' });
    }

    let targetPaymentType = (paymentType === 'subscription' || paymentType === 'premium') ? 'premium' : 'registration';

    
    provider.paymentDetails = {
      paymentType: targetPaymentType,
      paymentSlip: req.file.path,
      submittedAt: new Date()
    };

    if (targetPaymentType === 'registration') {
      provider.registrationFee = 'pending_approval';
    } else if (targetPaymentType === 'premium') {
      provider.subscriptionDetails.planId = planId || 'monthly';
      provider.subscriptionDetails.planTitle = planTitle || 'Monthly Plan';
      provider.subscriptionDetails.status = 'pending_approval';
    }

    await provider.save();

    return res.status(200).json({
      success: true,
      message: `${targetPaymentType} payment slip submitted successfully.`,
      data: provider
    });

  } catch (error) {
    console.error('Submit Payment Slip Error:', error);
    return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};


module.exports = {getProviderDashboardStats, updateProviderProfile,registerProvider , getPaymentDetails,submitPaymentSlip };