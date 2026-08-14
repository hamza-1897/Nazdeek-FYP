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


const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, phone, address } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    if (req.file) {
      user.profileImage = req.file.path;
    }

    await user.save();
    return res.status(200).json({ message: "Profile updated!", user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
    getUserProfile,
    updateUserProfile
}