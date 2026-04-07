const providerModel  = require('../../models/providerModel');

// get all providers
const getAllProviders = async (req,res) => {
    try {
        const providers = await providerModel.find().populate('userId', 'name email profileImage').populate('categoryId', 'name');
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    getAllProviders
}