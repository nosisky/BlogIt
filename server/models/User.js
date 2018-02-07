'use strict';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
	full_name: {
		type: String,
		required: 'Kindly enter you full name'
	},
	username: {
		type: String,
		required: 'Please enter your username'
	},
	password: {
		type: String,
		required: 'Please enter your password'
	},
	created_date: {
		type: Date,
		default: Date.now
	},
	email: {
		type: String
	}
});

module.exports = mongoose.model('User', User);
