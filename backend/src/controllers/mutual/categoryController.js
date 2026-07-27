const categoryModel = require('../../models/categoryModel')



const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    
    const existingCategory = await categoryModel.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category with this name already exists.',
      });
    }

    const newCategory = new categoryModel({
      name: name.trim(),
      description: description ? description.trim() : '',
    });

    await newCategory.save();

    return res.status(201).json({
      success: true,
      message: 'Category added successfully!',
      category: newCategory,
    });
  } catch (error) {
    console.error('Error in addCategory:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to add category.',
      error: error.message,
    });
  }
};


const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({ isActive: true }).select('name description');
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message,
    });
  }
};

module.exports = {getCategories , addCategory};