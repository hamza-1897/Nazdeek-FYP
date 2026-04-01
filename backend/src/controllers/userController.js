const userModel = require('../models/usersModel');
const { param } = require('../routes/adminRoutes');


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

module.exports = {
    getUserProfile
}