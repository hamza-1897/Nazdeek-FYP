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


// update provider status 
const updateProvider = async (req,res) => {
    try {
        const providerId = req.params.id;
        const {verificationStatus} = req.body;
        const provider = await providerModel.findById(providerId);
        if(!provider){
            res.status(404).json({message : "provider not found"})
        } 
               
            provider.verificationStatus = verificationStatus;
            await provider.save();
            res.status(200).json({message : `provider status updated to ${verificationStatus} successfully`});
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

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

        res.status(200).json(provider);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getAllProviders,
    getProviderById,
    getProviderDetails,
    updateProvider,
    getAllReports,
    resolveReport,
    deleteReport
}