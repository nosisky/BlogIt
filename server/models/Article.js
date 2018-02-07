import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Article = new Schema({
	userId: {
		type: String,
		required: 'User ID is required'
	},
	title: {
		type: String,
		required: 'Please enter article title'
	},
	content: {
		type: String,
		required: 'Please enter article content'
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Article', Article);
