const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  content: { type: String, required: true },
  userId: { type: String, required: true },
  postDate : {type: Date, required: true}
  
});

module.exports = mongoose.model('Post', postSchema);