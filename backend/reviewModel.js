const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
