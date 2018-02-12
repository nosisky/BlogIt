'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CommentSchema = new Schema({
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

var Comment = module.exports = _mongoose2.default.model('Comment', CommentSchema);
//# sourceMappingURL=Comment.js.map