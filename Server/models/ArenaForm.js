const mongoose = require('mongoose');

const arenaFormSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  location: {
    type: String,
    trim: true,
    default: '',
  },
  experienceLevel: {
    type: String,
    required: [true, 'Experience level is required'],
    enum: ['beginner', 'intermediate', 'advanced', ''],
    default: '',
  },
  motivation: {
    type: String,
    trim: true,
    enum: ['learning', 'competition', 'career', ''],
    default: '',
  },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
});

module.exports = mongoose.model('ArenaForm', arenaFormSchema);