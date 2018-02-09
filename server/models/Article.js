import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	authorId: {
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
	createdDate: {
		type: Date,
		default: Date.now
	}
});

const Article = (module.exports = mongoose.model('Article', ArticleSchema));
