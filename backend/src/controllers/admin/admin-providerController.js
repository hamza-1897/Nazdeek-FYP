const providerModel  = require('../../models/providerModel');

// get all providers
const getAllProviders = async (req,res) => {
    try {
        const providers = await providerModel.find().populate('userId', 'email').populate('categoryId', 'name');
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
            provider.verificationStatus = verificationStatus;
            await provider.save();
            res.status(200).json({message : "provider status updated successfully"});
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    getAllProviders,
    getProviderById,
    updateProvider
}