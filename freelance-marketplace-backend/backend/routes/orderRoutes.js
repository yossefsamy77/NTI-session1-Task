const express = require('express');
const Order = require('../models/Order');
const Gig = require('../models/Gig');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();


router.post('/', protect, restrictTo('client'), async (req, res) => {
  try {
    const { gigId, notes } = req.body;

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    const order = await Order.create({
      gig: gig._id,
      client: req.user.id,
      freelancer: gig.freelancer,
      notes: notes || ''
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.get('/my', protect, async (req, res) => {
  const filter =
    req.user.role === 'freelancer' ? { freelancer: req.user.id } : { client: req.user.id };

  const orders = await Order.find(filter)
    .populate('gig', 'title price images')
    .populate('client', 'name profileImage')
    .populate('freelancer', 'name profileImage')
    .sort({ createdAt: -1 });

  res.json(orders);
});


router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'in-progress', 'delivered', 'completed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const isFreelancer = order.freelancer.toString() === req.user.id;
    const isClient = order.client.toString() === req.user.id;

    if (!isFreelancer && !isClient) {
      return res.status(403).json({ message: 'You are not part of this order' });
    }


    if (status === 'completed' && !isClient) {
      return res.status(403).json({ message: 'Only the client can mark an order as completed' });
    }
    if (['in-progress', 'delivered'].includes(status) && !isFreelancer) {
      return res.status(403).json({ message: 'Only the freelancer can update this status' });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
