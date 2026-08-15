const express = require('express');
const Review = require('../models/Review');
const Order = require('../models/Order');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();


router.post('/', protect, restrictTo('client'), async (req, res) => {
  try {
    const { orderId, rating, comment } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.client.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only review your own orders' });
    }
    if (order.status !== 'completed') {
      return res.status(400).json({ message: 'You can only review completed orders' });
    }

    const existing = await Review.findOne({ order: orderId });
    if (existing) {
      return res.status(400).json({ message: 'This order has already been reviewed' });
    }

    const review = await Review.create({
      order: orderId,
      gig: order.gig,
      client: req.user.id,
      rating,
      comment
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.get('/gig/:gigId', async (req, res) => {
  const reviews = await Review.find({ gig: req.params.gigId })
    .populate('client', 'name profileImage')
    .sort({ createdAt: -1 });

  const average =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  res.json({ reviews, average: Math.round(average * 10) / 10, count: reviews.length });
});

module.exports = router;
