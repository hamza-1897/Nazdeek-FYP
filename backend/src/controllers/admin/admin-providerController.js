const providerModel  = require('../../models/providerModel');
const userModel = require('../../models/usersModel');
const reportModel = require('../../models/reportModel');

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
const getAllProviders = async (req,res) => {
    try {
        const providers = await providerModel.find({}).select('businessName verificationStatus providerImage address').populate('userId', 'email').populate('categoryId', 'name');
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
 
// get provider by id
const getProviderById = async (req,res) => {
    try {
        const providerId = req.params.id;
        const provider = await providerModel.findById(providerId).populate('userId', 'name email profileImage').populate('categoryId', 'name');
        if(!provider){
            res.status(404).json({message : "provider not found"})
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
        } else {
            if(verificationStatus == 'approved'){
                const user = await provider.populate('userId');
                user.userId.role = 'provider';
                await user.userId.save();
            }
            provider.verificationStatus = verificationStatus;
            await provider.save();
            res.status(200).json({message : "provider status updated successfully"});
        }
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
        const updatedReport = await Report.findByIdAndUpdate(
      id,
      { status: 'resolved' },
      { new: true }
    );

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

module.exports = {
    getAllUsers,
    getAllProviders,
    getProviderById,
    updateProvider,
    getAllReports,
    resolveReport,
    deleteReport
}