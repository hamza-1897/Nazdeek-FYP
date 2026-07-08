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

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await serviceModel
      .findById(id)
      .populate('providerId', 'businessName  address providerImage');
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getAllServices,
  getServiceById
};