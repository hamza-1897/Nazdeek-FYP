const settingModel = require('../../models/settingModel')

const getPublicSettings = async (req, res) => {
  try {
    let settings = await settingModel.findOne();

    return res.status(200).json({
      success: true,
      message: 'App settings fetched successfully',
      data: {
        contactDetails: settings.contactDetails,
        
      }
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch settings details',
      error: error.message
    });
  }
};

module.exports = {
  getPublicSettings
};