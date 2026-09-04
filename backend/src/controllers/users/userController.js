const userModel = require('../../models/usersModel');
const notificationModel = require('../../models/notificationModel');
const providerModel = require('../../models/providerModel');
const categoryModel = require('../../models/categoryModel');
const serviceModel = require('../../models/serviceModel');

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

// get customer dashbaord
const getCustomerDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await userModel.findById(userId).select('role');
    if (!user || user.role !== 'customer') {
      return res.status(404).json({ message: "Customer not found" });
    }

    const unreadNotifications = await notificationModel.exists({
      recipientId: userId,
      isRead: false
    });
    const hasUnreadNotifications = Boolean(unreadNotifications);

    const rawProviders = await providerModel.find({ verificationStatus: 'approved' })
      .select('businessName providerImage isPremium categoryId createdAt')
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 }) 
      .lean();

    const sortedProviders = rawProviders.sort((a, b) => {
      if (a.isPremium === b.isPremium) return 0;
      return a.isPremium ? -1 : 1;
    });

    const formattedProviders = sortedProviders.map((provider) => ({
      _id: provider._id,
      businessName: provider.businessName,
      providerImage: provider.providerImage,
      isPremium: provider.isPremium || false,
      categoryName: provider.categoryId ? provider.categoryId.name : 'General'
    }));

  
    const rawServices = await serviceModel.find()
      .populate({
        path: 'providerId',
        select: 'businessName providerImage isPremium'
      })
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 })
      .lean();

    const sortedServices = rawServices.sort((a, b) => {
      const aIsPremium = a.providerId?.isPremium || false;
      const bIsPremium = b.providerId?.isPremium || false;

      if (aIsPremium === bIsPremium) return 0;
      return aIsPremium ? -1 : 1;
    });

    return res.status(200).json({
      success: true,
      hasUnreadNotifications,
      providers: formattedProviders,
      services: sortedServices
    });

  } catch (error) {
    console.error("Error in getCustomerDashboard:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

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
    getCustomerDashboard,
    updateUserProfile
}