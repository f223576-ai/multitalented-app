const Task = require('../models/Task');
const Note = require('../models/Note');

// GET /api/dashboard
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const [totalTasks, pendingTasks, completedTasks, totalNotes, recentTasks, recentNotes] =
      await Promise.all([
        Task.countDocuments({ userId }),
        Task.countDocuments({ userId, status: 'pending' }),
        Task.countDocuments({ userId, status: 'completed' }),
        Note.countDocuments({ userId }),
        Task.find({ userId }).sort({ createdAt: -1 }).limit(5),
        Note.find({ userId }).sort({ createdAt: -1 }).limit(5),
      ]);

    res.json({
      stats: {
        totalTasks,
        pendingTasks,
        completedTasks,
        totalNotes,
      },
      recentTasks,
      recentNotes,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load dashboard', error: err.message });
  }
};