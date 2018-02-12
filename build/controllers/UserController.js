'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

var secret = process.env.secretKey;

var UserController = {
	/**
   * @description - Adds a new user to the database
   *
   * @param  {object} req - request object
   *
   * @param  {object} res - response object
   *
   * @return {Object} - Object containing user detail
   *
   * Route: POST: /users/signup
   */
	create: function create(req, res) {
		var newUser = new _User2.default(req.userInput);
		newUser.save(req.userInput).then(function (user) {
			var currentUser = (0, _omit2.default)(user.toObject(), ['password', 'createdDate']);
			var token = _jsonwebtoken2.default.sign({
				currentUser: currentUser,
				exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
			}, secret);
			return res.status(201).send({
				message: 'Signed up successfully',
				token: token
			});
		}).catch(function (error) {
			res.status(500).send({
				error: error
			});
		});
	},


	/**
   * @description - Authenticates user login information
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Object containing user details
   *
   * Route: POST: /users/signin
   */
	login: function login(req, res) {
		if (!req.body.username || !req.body.password) {
			return res.status(401).json({
				message: 'Please provide your username or password to login'
			});
		}

		var username = req.body.username.toLowerCase();

		return _User2.default.findOne({
			username: username
		}).then(function (user) {
			if (user && _bcrypt2.default.compareSync(req.body.password, user.password)) {
				var currentUser = (0, _omit2.default)(user.toObject(), ['password', 'createdDate']);
				var token = _jsonwebtoken2.default.sign({
					currentUser: currentUser,
					exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
				}, secret);
				return res.status(200).send({
					message: 'Logged In Successfully',
					token: token
				});
			}
			return res.status(401).json({
				message: 'Invalid Credentials.'
			});
		}).catch(function (error) {
			return res.status(500).send(error);
		});
	}
};

exports.default = UserController;
//# sourceMappingURL=UserController.js.map