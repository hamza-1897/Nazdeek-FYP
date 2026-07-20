const reviewModel = require('../../models/reviewModel');

// create review
const createReview = async (req, res) => {
  try {
    const { providerId, userId, rating, comment } = req.body;

  

    const newReview = await reviewModel.create({
      providerId,
      userId,
      rating,
      comment
    });

    res.status(201).json({
      message: "Review submitted successfully",
      review: newReview
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Reviews for a Specific Provider
const getProviderReviews = async (req, res) => {
  try {
    const { providerId } = req.params;

    const reviews = await reviewModel.find({ providerId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createReview,
  getProviderReviews
};