const categoryModel = require('../../models/categoryModel');
const providerModel = require('../../models/providerModel');

// get All Categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find().lean();

        const categoriesWithCounts = await Promise.all(
            categories.map(async (cat) => {
                const providersCount = await providerModel.countDocuments({ categoryId: cat._id });

                return {
                    ...cat,
                    providers: providersCount 
                };
            })
        );

        res.status(200).json({
            success: true,
            data: categoriesWithCounts
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server Error", 
            error: error.message 
        });
    }
};


// Add New Category
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
// edit category 
const editCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name, description } = req.body;

        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found.',
            });
        }

        if (name && name.trim()) {
            const trimmedName = name.trim();

            const existingCategory = await categoryModel.findOne({
                _id: { $ne: categoryId },
                name: { $regex: new RegExp(`^${trimmedName}$`, 'i') },
            });

            if (existingCategory) {
                return res.status(400).json({
                    success: false,
                    message: 'Another category with this name already exists.',
                });
            }

            category.name = trimmedName;
        }

        if (description !== undefined) {
            category.description = description.trim();
        }

        await category.save();

        return res.status(200).json({
            success: true,
            message: 'Category updated successfully!',
            category,
        });
    } catch (error) {
        console.error('Error in editCategory:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update category.',
            error: error.message,
        });
    }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await categoryModel.findByIdAndDelete(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Category deleted successfully!',
      
    });
} catch (error) {
        console.error('Error in deleteCategory:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to delete category.',
            error: error.message,
        });         
    }
};

module.exports = { addCategory, getAllCategories, editCategory, deleteCategory };