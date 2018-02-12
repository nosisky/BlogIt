import mongoose from 'mongoose';

const { Schema } = mongoose;


const UserSchema = new Schema({
  username: {
    type: String,
    required: 'Please enter your username'
  },
  password: {
    type: String,
    required: 'Please enter your password'
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String
  },
  isAdmin: {
    type: Number,
    default: 0
  }
});

const User = (module.exports = mongoose.model('User', UserSchema));
