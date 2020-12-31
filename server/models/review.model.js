const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    producerId: {
      type: Number,
      required: true,
    },
    consumerId: {
      type: Number,
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
    reviewTitle: {
      type: String,
      required: true,
    },
    reviewDesc: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
