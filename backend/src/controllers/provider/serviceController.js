const serviceModel = require("../../models/serviceModel");

const createService = async (req, res) => {
  try {
    const { 
      providerId, 
      serviceName, 
      description, 
      price, 
      categoryId,
      serviceImages, 
    } = req.body;


    const serviceImages = req.files['serviceImages'] ? req.files['serviceImages'].map(f => f.path) 
 : [];

    const newService = new serviceModel({
        providerId,
        serviceName,
        description,
        price,
        categoryId,
        serviceImages,
    });

    await newService.save();

    res.status(201).json({ 
      success: true, 
      message: "Service created successfully.",
      data: newService 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getServicesByProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    const services = await serviceModel.find({ providerId });
    res.status(200).json({ 
      success: true, 
      message: "Services retrieved successfully.",
      data: services 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const editService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { 
      serviceName, 
      description,
      price,
      serviceImages,
    } = req.body;

    const updatedService = await serviceModel.findByIdAndUpdate(
      serviceId,
      { serviceName, description, price, serviceImages },
      { new: true }
    );
    
    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Service updated successfully.",
      data: updatedService 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const deletedService = await serviceModel.findByIdAndDelete(serviceId);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ 
      success: true, 
      message: "Service deleted successfully.",
      data: deletedService 
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
module.exports = { createService, editService,deleteService, getServicesByProvider };