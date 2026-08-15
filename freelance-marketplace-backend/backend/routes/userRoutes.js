const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { profileUpload } = require('../middleware/upload');

const router = express.Router();

router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});


router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-password -email');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});


router.put('/me', protect, profileUpload.single('profileImage'), async (req, res) => {
  try {
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.bio !== undefined) updates.bio = req.body.bio;
    if (req.file) updates.profileImage = `/uploads/profiles/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true
    }).select('-password');

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
