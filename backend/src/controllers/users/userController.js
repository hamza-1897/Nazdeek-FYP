const userModel = require('../../models/usersModel');


// Get User Profile
const getUserProfile = async (req,res) => {
    const userId = req.params.id;
    const user = await userModel.findById(userId).select('-password');
    if(!user){
        res.status(404).json({message : "user not found"})
    } else {
        res.status(200).json(user)
    }
}

// Update User Profile
const updateUserProfile = async (req,res) => {
    try {
        const userId = req.params.id;
        const { name } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {return res.status(404).json({ message: "User not found" });
    } else {
        
        if (name) {
            user.name = name;
            
        }

       
        if (req.file) {
            
            user.profileImage = req.file.path;
            
        }

        await user.save();
        res.status(200).json({ message: "Profile updated!", user });
    }

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile
}