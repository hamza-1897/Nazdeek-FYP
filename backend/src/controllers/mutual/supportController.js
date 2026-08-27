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


const getPremiumPlans = async (req, res) => {
  try {
    let settings = await settingModel.findOne();

    
    const plans = [
      {
        id: 'monthly',
        title: 'Monthly Plan',
        duration: '1 Month',
        price: settings.feeConfig.monthlyPremiumPrice,
        currency: 'PKR',
        
      },
      {
        id: 'quarterly',
        title: 'Quarterly Plan',
        duration: '3 Months',
        price: settings.feeConfig.quarterlyPremiumPrice,
        currency: 'PKR',
        
      },
      {
        id: 'yearly',
        title: 'Yearly Plan',
        duration: '1 Year',
        price: settings.feeConfig.yearlyPremiumPrice,
        currency: 'PKR',
        
      }
    ];

    const activePaymentAccounts = settings.paymentAccounts.filter(acc => acc.isActive);

    return res.status(200).json({
      success: true,
      message: 'Premium subscription plans fetched successfully',
      data: {
        plans, 
        
        paymentAccounts: activePaymentAccounts
      }
    });

  } catch (error) {
    console.error('Error fetching premium plans:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch premium plans',
      error: error.message
    });
  }
};

module.exports = {
  getPublicSettings,
  getPremiumPlans
};