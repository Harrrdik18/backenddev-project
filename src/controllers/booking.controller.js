const Booking = require('../models/booking.model');
const Activity = require('../models/activity.model');

// Book an activity
exports.createBooking = async (req, res) => {
  try {
    const { activityId } = req.body;

    // Check if activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Check if user has already booked this activity
    const existingBooking = await Booking.findOne({
      user: req.user._id,
      activity: activityId
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked this activity' });
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      activity: activityId
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error('Create booking error:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(err.errors).map(e => e.message)
      });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid activity ID format' });
    }
    res.status(500).json({ 
      message: 'Error creating booking',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Get user's bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('activity')
      .sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (err) {
    console.error('Get user bookings error:', err);
    res.status(500).json({ 
      message: 'Error fetching user bookings',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}; 