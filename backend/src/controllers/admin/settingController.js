const settingModel = require('../../models/settingModel');

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
  updateContactDetails
};