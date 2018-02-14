import mongoose from 'mongoose';

const { Schema } = mongoose;


const CommentSchema = new Schema({
  userId: {
    type: String,
    required: 'User ID is required'
  },
  comment: {
    type: String,
    required: 'Please enter your comment'
  },
  articleId: {
    type: String,
    required: 'Please enter article ID'
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const Comment = (mongoose.model('Comment', CommentSchema));

export default Comment;
