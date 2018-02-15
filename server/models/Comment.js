import mongoose from 'mongoose';

const { Schema } = mongoose;


const CommentSchema = new Schema({
  username: {
    type: String,
    required: 'Username is required'
  },
  comment: {
    type: String,
    required: 'Please enter your comment'
  },
  articleSlug: {
    type: String,
    required: 'Please enter article slug'
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const Comment = (mongoose.model('Comment', CommentSchema));

export default Comment;
