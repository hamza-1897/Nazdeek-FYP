const settingModel = require('../../models/settingModel');
const userModel = require('../../models/usersModel');
const providerModel  = require('../../models/providerModel');




const getDashboardStats = async (req, res) => {
  try {
    const [
      totalCustomers,
      totalProviders,
      pendingPayments,
      pendingVerifications,
      premiumProviders
    ] = await Promise.all([
      userModel.countDocuments({ role: 'customer' }),
      userModel.countDocuments({ role: 'provider' }),

      providerModel.countDocuments({
        $or: [
          { registrationFee: 'pending_approval' },
          { 'subscriptionDetails.status': 'pending_approval' },
          { 'paymentDetails.paymentType': { $in: ['registration', 'premium'] } }
        ]
      }),

      providerModel.countDocuments({ verificationStatus: 'pending' }),

      providerModel.countDocuments({
        $or: [
          { isPremium: true },
          { 'subscriptionDetails.status': 'active' }
        ]
      })
    ]);

    const recentCustomers = await userModel.find({ role: 'customer' })
      .sort({ createdAt: -1 })
      .limit(4)
      .select('name email isActive createdAt');

    const recentProviders = await providerModel.find()
      .select('businessName verificationStatus createdAt categoryId')
      .populate('userId', 'name email')
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 })
      .limit(4);

    return res.status(200).json({
      success: true,
      stats: {
        totalCustomers,
        totalProviders,
        pendingPayments,
        pendingVerifications,
        premiumProviders
      },
      recentCustomers,
      recentProviders
    });
  } catch (error) {
    console.error("Error in Dashboard Stats:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching stats",
      error: error.message
    });
  }
};

// get System Settings
const getSystemSettings = async (req, res) => {
  try {
    const settings = await settingModel.findOne();
    (!settings) && (await settingModel.create({}));
    return res.status(200).json(settings);
    } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// update payment accounts 
const updatePaymentAccounts = async (req, res) => {
   try {
    const { paymentAccounts } = req.body;
    const settings = await settingModel.findOne();
    settings.paymentAccounts = paymentAccounts;
    await settings.save();
    return res.status(200).json({ message: "Payment Accounts updated successfully", data: settings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// update fee config
const updateFeeConfig = async (req, res) => {
  try {
    const { feeConfig } = req.body;
    const settings = await settingModel.findOne();
    settings.feeConfig = feeConfig;
    await settings.save();
    return res.status(200).json({ message: "Fee Config updated successfully", data: settings });
  }
    catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// update contact details
const updateContactDetails = async (req, res) => {
    try {
    const { contactDetails } = req.body;
    const settings = await settingModel.findOne();
    settings.contactDetails = contactDetails;
    await settings.save();
    return res.status(200).json({ message: "Contact Details updated successfully", data: settings });
  }
    catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = {
  getSystemSettings,
  updatePaymentAccounts,
  updateFeeConfig,
  updateContactDetails,
  getDashboardStats
};