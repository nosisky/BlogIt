'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var UserSchema = new Schema({
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

var User = module.exports = _mongoose2.default.model('User', UserSchema);
//# sourceMappingURL=User.js.map