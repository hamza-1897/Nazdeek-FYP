const serviceModel = require('../../models/serviceModel');
const providerModel = require('../../models/providerModel');
const reviewModel = require('../../models/reviewModel');
const userModel = require('../../models/usersModel')

const getAllServices = async (req, res) => {
  try {
    const services = await serviceModel.find().select('_id serviceName price  priceType serviceImages providerId')
    .populate('providerId', 'businessName address')
    .populate('categoryId', 'name');
    res.status(200).json({ 
      success: true, 
      message: "All services retrieved successfully.",
      data: services 
    });
  }
    catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await serviceModel
      .findById(id)
      .populate('providerId', 'businessName address providerImage')
      .populate('categoryId', 'name');

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const reviews = await reviewModel
      .find({ serviceId: id })
      .populate('userId', 'name profileImage');

    res.status(200).json({
      success: true,
      data: {
        ...service.toObject(),
        reviews
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


//get provider profile 
const getProviderbyId = async (req, res) => {
  try {
    const { providerId } = req.params;

    if (!providerId) {
      return res.status(400).json({ success: false, message: 'Provider ID is required' });
    }

    const [provider, services] = await Promise.all([
      providerModel
        .findById(providerId)
        .select('businessName providerImage description workImages categoryId address experience isPremium')
        .populate('categoryId', 'name ')
        .lean(), 

      serviceModel
        .find({ providerId })
        .select('serviceName description price serviceImages ')
        .lean()
    ]);

    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }

    

    const reviews = await reviewModel
      .find({ providerId: { $in: providerId } })
      .select('rating comment userId ')
      .populate('userId', 'name profileImage')
      .sort({ createdAt: -1 })
      .limit(10) 
      .lean();

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
      ? (reviews.reduce((acc, item) => acc + (item.rating || 0), 0) / totalReviews).toFixed(1)
      : 0;

    return res.status(200).json({
      success: true,
      data: {
        provider,
        services,
        reviews,
        stats: {
          totalReviews,
          averageRating: Number(averageRating),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching provider details:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};


module.exports = {
  getAllServices,
  getServiceById,
  getProviderbyId
};