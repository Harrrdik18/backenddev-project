const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide activity title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide activity description'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Please provide activity location'],
    trim: true
  },
  dateTime: {
    type: Date,
    required: [true, 'Please provide activity date and time']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity; 