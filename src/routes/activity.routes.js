const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const activityController = require('../controllers/activity.controller');
const protect = require('../middleware/auth.middleware');

// Get all activities (public)
router.get('/', activityController.getAllActivities);

// Create new activity (protected)
router.post('/', protect, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('dateTime').isISO8601().withMessage('Valid date and time is required')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, activityController.createActivity);

module.exports = router; 