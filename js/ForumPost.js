const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

postSchema.index({ createdAt: -1 });
postSchema.index({ user: 1 });

const ForumPost = mongoose.model('ForumPost', postSchema);

module.exports = ForumPost;