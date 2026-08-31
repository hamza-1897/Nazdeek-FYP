const userModel = require('../../models/usersModel');
const otpModel = require('../../models/otpModel');
const providerModel = require('../../models/providerModel');
const categoryModel = require('../../models/categoryModel');
const settingModel = require('../../models/settingModel'); 

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/envConfig');
const {generateToken, generateNewAccessToken} = require('../../lib/generateToken');
const checkPassword = require('../../lib/checkPass');
const {signUpOTP, forgotPasswordOTP} = require('../../lib/generateOTP');

// User Registration 
const registerUser = async (req,res) => {
    const {email } = req.body;

    const user = await userModel.findOne({email})

    if(user){
        res.status(400).json({message : "user already exists"})
    } else {

      return await signUpOTP(req, res)     
       
  }

}

// OTP Verification for user registration
const verifySignUPOTP = async (req,res) => {
    const {email , otp, password,  phone, role} = req.body;

    const otpEntry = await otpModel.findOne({email, otp});

    if(!otpEntry){
        res.status(400).json({message : "no OTP found"})
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt)
        const user = new userModel({
            name: otpEntry.name,
            email: otpEntry.email,
            phone : phone,
            role : role,
            password: hashPassword,
        });
        await user.save();
        await otpModel.deleteOne({email, otp});
        res.status(200).json({message : "user registered successfully"})    
    }

    
}

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user || !(await checkPassword(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "User account is deactivated" });
    }

    let providerStatus = null;
    let providerInfo = null;

    const settings = await settingModel.findOne();
    const isRegistrationFree = settings?.feeConfig?.isRegistrationFree ?? false;

    if (user.role === 'provider') {
      const providerDoc = await providerModel
        .findOne({ userId: user._id })
        .select('providerId providerImage businessName isPremium verificationStatus accountRejectionReason categoryId registrationFee')
        .populate('categoryId', 'name');

      if (!providerDoc) {
        providerStatus = 'unsubmitted';
      } else {
        providerStatus = providerDoc.verificationStatus;
        providerInfo = providerDoc;
      }
    }

    const { accessToken, refreshToken } = generateToken(user._id, user.role, res);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      profileImage: user.profileImage,
      providerStatus,
      providerInfo,
      isRegistrationFree,
      message: "User logged in successfully",
      accessToken,
      refreshToken 
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ 
      message: error.message || "Internal server error during login" 
    });
  }
};
// User Logout
const userLogout = async (req,res) => {
    res.clearCookie('jwt', { httpOnly: true, secure: false, sameSite: 'strict',path: "/" });
    res.status(200).json({message : "user logged out successfully"})
}

// Forgot Password - OTP Generation
const forgotOTP = async (req, res) => {

 const {email} = req.body;
    const user = await userModel.findOne({email})

    if(!user){
        res.status(400).json({message : "user with this email does not exist"})
    } else {
       return  await forgotPasswordOTP(email, res)       
  }
}

// Password Reset - OTP Verification
const verifyForgotOTP = async (req,res) => {
    const {email , otp} = req.body;
    const otpEntry = await otpModel.findOne({email, otp});

    if(!otpEntry){
        res.status(400).json({message : "invalid OTP"})
    } else {
        await otpModel.deleteOne({email, otp});
        res.status(200).json({message : "OTP verified successfully"})
    }
}

// Password Reset - Update Password
const resetPassword = async (req,res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email})
    if(!user){
        res.status(400).json({message : "user with this email does not exist"})
    } else {

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt)
    
        user.password = hashPassword;
        await user.save();
        res.status(200).json({message : "password reset successfully"})
    }
}

// Update role
const updateRole = async (req,res) => {
    const userId = req.params.id;
    const {role} = req.body;
    const user = await userModel.findById(userId);
    if(!user){
        res.status(404).json({message : "user not found"})
    } else {
        user.role = role;
        await user.save();
        res.status(200).json({message : "user role updated successfully"})
    }
}



// Refresh Access Token
const refreshAccessToken = async (req,res) => {

    const refreshToken = req.cookies.jwt;
    console.log("refresh token: ", refreshToken);
    if(!refreshToken){
        return res.status(401).json({message : "no refresh token provided"})
    } else {
    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
    const userId = decoded.userId;
    const userRole = decoded.role;
    const newAccessToken = generateNewAccessToken(userId , userRole);
    res.status(200).json({accessToken: newAccessToken})
    }
}
const getMe = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access, user ID missing" });
    }
    const user = await userModel.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "User account is deactivated" });
    }

    let providerStatus = null;
    let providerInfo = null;

    const settings = await settingModel.findOne();
    const isRegistrationFree = settings?.feeConfig?.isRegistrationFree ?? false;

    if (user.role === 'provider') {
      const providerDoc = await providerModel
        .findOne({ userId: user._id })
        .select('providerId providerImage businessName isPremium verificationStatus accountRejectionReason categoryId registrationFee')
        .populate('categoryId', 'name');

      if (!providerDoc) {
        providerStatus = 'unsubmitted';
      } else {
        providerStatus = providerDoc.verificationStatus;
        providerInfo = providerDoc;
      }
    }

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      profileImage: user.profileImage,
      providerStatus,
      providerInfo,
      isRegistrationFree,
      message: "User profile fetched successfully"
    });

  } catch (error) {
    console.error("Get Me Error:", error);
    return res.status(500).json({ 
      message: error.message || "Internal server error fetching user data" 
    });
  }
};

module.exports = {registerUser,verifySignUPOTP ,getMe, userLogin, userLogout, forgotOTP,verifyForgotOTP, updateRole, resetPassword,refreshAccessToken};
