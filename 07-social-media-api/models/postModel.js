const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  post: {
    type: String,
    required: [true, "Please input the post"]
  },
  likes: {
    type: Number,
    default: 100
  }
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);