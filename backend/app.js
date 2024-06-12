const express = require('express');
const mongoose = require('mongoose');
const Review = require('./reviewModel');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost:27017/toystore', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use(cors());

app.post('/submit-review', async (req, res) => {
  try {
    const newReview = new Review({
      email: req.body.email,
      description: req.body.description,
      rating: req.body.rating
    });
    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (err) {
    console.error('Error submitting review:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/get-reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(6);
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});