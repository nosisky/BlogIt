'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseSlugGenerator = require('mongoose-slug-generator');

var _mongooseSlugGenerator2 = _interopRequireDefault(_mongooseSlugGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.plugin(_mongooseSlugGenerator2.default);
var Schema = _mongoose2.default.Schema;

var ArticleSchema = new Schema({
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

var Article = module.exports = _mongoose2.default.model('Article', ArticleSchema);
//# sourceMappingURL=Article.js.map