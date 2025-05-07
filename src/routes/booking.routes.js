const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bookingController = require('../controllers/booking.controller');
const protect = require('../middleware/auth.middleware');

// Book an activity
router.post('/', protect, [
  body('activityId').notEmpty().withMessage('Activity ID is required')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, bookingController.createBooking);

// Get user's bookings
router.get('/my-bookings', protect, bookingController.getUserBookings);

module.exports = router; 