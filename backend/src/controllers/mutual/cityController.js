
const cityModel = require('../../models/cityModel');

const getCities = async (req, res) => {
  try {
    const cities = await cityModel.find({ isActive: true }).select('name');
    res.status(200).json({
      success: true,
      cities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cities',
      error: error.message,
    });
  }
};

module.exports = { getCities };