const serviceModel = require('../../models/serviceModel');
const providerModel = require('../../models/providerModel');

const getAllServices = async (req, res) => {
  try {
    const services = await serviceModel.find().select('_id serviceName price serviceImages providerId').populate('providerId', 'businessName ');
    res.status(200).json({ 
      success: true, 
      message: "All services retrieved successfully.",
      data: services 
    });
  }
    catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getAllServices
};