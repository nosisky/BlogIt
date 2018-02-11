import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);
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
	slug: {
		type: String,
		slug: [ 'title' ],
		slug_padding_size: 4,
		unique: true
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
