const Activity = require('../models/activity.model');

// Get all activities
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ dateTime: 1 });
    res.json(activities);
  } catch (err) {
    console.error('Get activities error:', err);
    res.status(500).json({ 
      message: 'Error fetching activities',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Create new activity
exports.createActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (err) {
    console.error('Create activity error:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(err.errors).map(e => e.message)
      });
    }
    res.status(500).json({ 
      message: 'Error creating activity',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}; 