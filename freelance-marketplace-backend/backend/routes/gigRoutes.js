const express = require('express');
const Gig = require('../models/Gig');
const { protect, restrictTo } = require('../middleware/auth');
const { gigUpload } = require('../middleware/upload');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search) filter.title = { $regex: req.query.search, $options: 'i' };

    const gigs = await Gig.find(filter)
      .populate('freelancer', 'name profileImage')
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const gig = await Gig.findById(req.params.id).populate('freelancer', 'name profileImage bio');
  if (!gig) return res.status(404).json({ message: 'Gig not found' });
  res.json(gig);
});


router.post('/', protect, restrictTo('freelancer'), gigUpload.array('images', 5), async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    if (!title || !description || !price || !category) {
      return res.status(400).json({ message: 'title, description, price, and category are required' });
    }

    const gig = await Gig.create({
      title,
      description,
      price,
      category,
      images: (req.files || []).map((f) => `/uploads/gigs/${f.filename}`),
      freelancer: req.user.id
    });

    res.status(201).json(gig);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/:id', protect, restrictTo('freelancer'), gigUpload.array('images', 5), async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    if (gig.freelancer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only edit your own gigs' });
    }

    const { title, description, price, category } = req.body;
    if (title) gig.title = title;
    if (description) gig.description = description;
    if (price) gig.price = price;
    if (category) gig.category = category;
    if (req.files && req.files.length > 0) {
      gig.images = req.files.map((f) => `/uploads/gigs/${f.filename}`);
    }

    await gig.save();
    res.json(gig);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/:id', protect, restrictTo('freelancer'), async (req, res) => {
  const gig = await Gig.findById(req.params.id);
  if (!gig) return res.status(404).json({ message: 'Gig not found' });

  if (gig.freelancer.toString() !== req.user.id) {
    return res.status(403).json({ message: 'You can only delete your own gigs' });
  }

  await gig.deleteOne();
  res.json({ message: 'Gig deleted' });
});

module.exports = router;
