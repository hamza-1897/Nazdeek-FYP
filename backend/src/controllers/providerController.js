const providerModel = require('../models/providerModel'); 
const userModel = require('../models/usersModel');     

const registerProvider = async (req, res) => {
  try {
    const { 
      userId, 
      businessName, 
      bio, 
      cnicNumber, 
      address, 
      categoryId, 
      experience 
    } = req.body;


   
    const cnicImages = req.files['cnicImages'] ? req.files['cnicImages'].map(f => f.path) : [];
    const providerImage = req.files['providerImage'] ? req.files['providerImage'].map(f => f.path) : [];

    
    const newProvider = new providerModel({
      userId,
      businessName,
      bio,
      cnicNumber,
      cnicImages,
      providerImage,
      address,
      categoryId,
      experience,
      
    });

    await newProvider.save();

    res.status(201).json({ 
      success: true, 
      message: "Application submit ho gayi hai. Admin verification ka intezar karein.",
      data: newProvider 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { registerProvider };