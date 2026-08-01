const serviceModel = require("../../models/serviceModel");
const providerModel = require("../../models/providerModel");
const categoryModel = require("../../models/categoryModel");

const createService = async (req, res) => {
  try {
    const { 
      providerId, 
      serviceName, 
      description, 
      price, 
      priceType,
      categoryId 
    } = req.body;

    const files = req.files || [];

    if (files.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "At least one service image is required." 
      });
    }

    const serviceImagesUrls = files.map(file => file.path);

    const newService = new serviceModel({
      providerId,
      serviceName,
      description,
      price,
      priceType,
      categoryId,
      serviceImages: serviceImagesUrls, 
    });

    await newService.save();

    return res.status(201).json({ 
      success: true, 
      message: "Service created successfully.",
      data: newService 
    });

  } catch (error) {
    console.error("Error in createService:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server Error", 
      error: error.message 
    });
  }
};

const getServicesByProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    
    const services = await serviceModel.find({ providerId })
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 });

    return res.status(200).json({ 
      success: true, 
      message: "Services retrieved successfully.",
      data: services 
    });
  } catch (error) {
    console.error("Error in getServicesByProvider:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server Error", 
      error: error.message 
    });
  }
};

const editService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { 
      serviceName, 
      description,
      price,
      priceType,
      categoryId
    } = req.body;

    const files = req.files || [];
    let updateData = { 
      serviceName, 
      description, 
      price, 
      priceType, 
      categoryId 
    };

    if (files.length > 0) {
      updateData.serviceImages = files.map(file => file.path);
    }

    const updatedService = await serviceModel.findByIdAndUpdate(
      serviceId,
      updateData,
      { new: true }
    );
    
    if (!updatedService) {
      return res.status(404).json({ 
        success: false, 
        message: "Service not found" 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: "Service updated successfully.",
      data: updatedService 
    });
  } catch (error) {
    console.error("Error in editService:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server Error", 
      error: error.message 
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    
    const deletedService = await serviceModel.findByIdAndDelete(serviceId);
    
    if (!deletedService) {
      return res.status(404).json({ 
        success: false, 
        message: "Service not found" 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: "Service deleted successfully.",
      data: deletedService 
    });
  } catch (error) {
    console.error("Error in deleteService:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server Error", 
      error: error.message 
    });
  }
};

module.exports = { 
  createService, 
  editService, 
  deleteService, 
  getServicesByProvider 
};