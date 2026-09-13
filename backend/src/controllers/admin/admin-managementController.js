const adminModel = require('../../models/adminModel');
const bcrypt = require('bcryptjs');


const addNewAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "name, email, password and role are all required" });
        }

        if (!['admin', 'superadmin'].includes(role)) {
            return res.status(400).json({ message: "role must be either 'admin' or 'superadmin'" });
        }

        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "an admin with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newAdmin = new adminModel({ name, email, password: hashPassword, role });
        await newAdmin.save();

        res.status(201).json({
            message: "new admin added successfully",
            admin: {
                _id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
                role: newAdmin.role,
                createdAt: newAdmin.createdAt,
            },
        });
    } catch (error) {
        console.error("Error adding new admin:", error);
        res.status(500).json({ message: "server error while adding admin" });
    }
};


const getAllAdmins = async (req, res) => {
    try {
        const admins = await adminModel.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json({ admins });
    } catch (error) {
        console.error("Error fetching admins:", error);
        res.status(500).json({ message: "server error while fetching admins" });
    }
};

module.exports = { addNewAdmin, getAllAdmins };