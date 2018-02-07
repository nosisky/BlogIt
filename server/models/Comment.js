'use strict';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Comment = new Schema({
	userId: {
		type: String,
		required: 'User ID is required'
	},
	comment: {
		type: String,
		required: 'Please enter your username'
	},
	articleId: {
		type: String,
		required: 'Please enter your password'
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Comment', Comment);
