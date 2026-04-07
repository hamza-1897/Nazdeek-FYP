const categoryModel = require('../models/categoryModel');


const addCategory = async (req, res) => {
    try {
        const { name, icon } = req.body; 
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }
        const newCategory = new categoryModel({
            name,
            icon
        });

        await newCategory.save();

        res.status(201).json({
            success: true,
            message: "Category added successfully",
            data: newCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { addCategory };