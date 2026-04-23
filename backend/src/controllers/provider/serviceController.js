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

module.exports = { createService };