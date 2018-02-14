import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);
const { Schema } = mongoose;

const ArticleSchema = new Schema({
  author: {
    type: String,
    required: 'Author name is required'
  },
  title: {
    type: String,
    required: 'Please enter article title'
  },
  slug: {
    type: String,
    slug: ['title'],
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

const Article = (mongoose.model('Article', ArticleSchema));

export default Article;
