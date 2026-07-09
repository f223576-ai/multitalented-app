const User = require('../models/User');

// GET /api/profile
exports.getProfile = async (req, res) => {
  res.json(req.user.toSafeObject());
};

// PUT /api/profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, avatar, settings } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (avatar !== undefined) user.avatar = avatar;
    if (settings) user.settings = { ...user.settings.toObject(), ...settings };

    await user.save();

    res.json(user.toSafeObject());
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
};

// PUT /api/profile/password
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new password are required' });
    }

    const user = await User.findById(req.user._id);
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update password', error: err.message });
  }
};