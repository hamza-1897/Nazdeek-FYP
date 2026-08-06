const categoryModel = require('../../models/categoryModel')





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

module.exports = {getCategories };