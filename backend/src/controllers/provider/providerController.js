const providerModel = require('../../models/providerModel'); 
const userModel = require('../../models/usersModel');  

const registerProvider = async (req, res) => {
  try {
    const { 
      userId, 
      businessName, 
      description, 
      cnicNumber, 
      address, 
      categoryId, 
      experience 
    } = req.body;

    const providerImage = req.files?.['providerImage'] 
      ? req.files['providerImage'][0].path 
      : null;

    const cnicFront = req.files?.['cnicFront'] ? req.files['cnicFront'][0].path : null;
    const cnicBack = req.files?.['cnicBack'] ? req.files['cnicBack'][0].path : null;
    
    const cnicImages = [];
    if (cnicFront) cnicImages.push(cnicFront);
    if (cnicBack) cnicImages.push(cnicBack);

    const workImages = req.files?.['workImages'] 
      ? req.files['workImages'].map(f => f.path) 
      : [];

    let existingProvider = await providerModel.findOne({ userId });

    if (!businessName || !cnicNumber || !categoryId || (!providerImage && !existingProvider?.providerImage)) {
      return res.status(400).json({ 
        success: false, 
        message: "Required fields or profile image missing." 
      });
    }

    if (existingProvider) {
      existingProvider.businessName = businessName;
      existingProvider.description = description || existingProvider.description;
      existingProvider.cnicNumber = cnicNumber;
      existingProvider.address = address || existingProvider.address;
      existingProvider.categoryId = categoryId;
      existingProvider.experience = Number(experience) || existingProvider.experience;
      
      if (providerImage) existingProvider.providerImage = providerImage;
      if (cnicImages.length > 0) existingProvider.cnicImages = cnicImages;
      if (workImages.length > 0) existingProvider.workImages = workImages;

      existingProvider.verificationStatus = 'pending';
      existingProvider.accountRejectionReason = null;

      await existingProvider.save();

      return res.status(200).json({ 
        success: true, 
        message: "Application re-submitted successfully. Pending admin review.",
        data: existingProvider 
      });
    }

    const newProvider = new providerModel({
      userId,
      businessName,
      description, 
      cnicNumber,
      cnicImages,
      providerImage,
      workImages, 
      address,
      categoryId,
      experience: Number(experience) || 0,
      verificationStatus: 'pending',
      accountRejectionReason: null
    });

    await newProvider.save();

    return res.status(201).json({ 
      success: true, 
      message: "Application submitted successfully. Pending admin review.",
      data: newProvider 
    });

  } catch (error) {
    console.error("Provider Registration Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server Error", 
      error: error.message 
    });
  }
};
// payment setup
const submitPaymentSlip = async (req, res) => {
  try {
    const { providerId, paymentType  } = req.body;
    const provider = await providerModel.findById(providerId);

    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider profile not found.' });
    }
    const paymentSlipUrl = req.file.path;

    provider.paymentDetails = {
      paymentType,
      paymentSlip: paymentSlipUrl,
      submittedAt: new Date()
    };

    if (paymentType === 'registration') {
      provider.registrationFee = 'pending_approval';
    }

    await provider.save();

    return res.status(200).json({
      success: true,
      message: `${paymentType} payment slip submitted successfully. Waiting for admin verification.`,
      data: provider
    });
    } catch (error) {
    console.error('Submit Payment Slip Error:', error);
    return res.status(500).json({ success: false, message: 'Server error while submitting payment slip.' });
  }
};


module.exports = { registerProvider , submitPaymentSlip };