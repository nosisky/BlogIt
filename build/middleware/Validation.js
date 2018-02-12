'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _Article = require('../models/Article');

var _Article2 = _interopRequireDefault(_Article);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Validation = {
	/**
   *
   * @description - Validates Article Input
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
   *
   * @param {Object} next - call back function
   *
   * @returns {Object} - Object containing error message
   */
	checkUserInput: function checkUserInput(req, res, next) {
		var userNameError = '';
		userNameError = 'Please provide a username with atleast 4 characters.';
		req.assert('passwordConfirm', 'Passwords must match').equals(req.body.password);

		req.checkBody({
			username: {
				notEmpty: true,
				isLength: {
					options: [{ min: 4 }],
					errorMessage: userNameError
				},
				errorMessage: 'Your Username is required'
			},
			email: {
				notEmpty: true,
				isEmail: {
					errorMessage: 'Provide a valid a Email Adrress'
				},
				errorMessage: 'Your Email Address is required'
			},
			password: {
				notEmpty: true,
				isLength: {
					options: [{ min: 4 }],
					errorMessage: 'Provide a valid password with minimum of 4 characters'
				},
				errorMessage: 'Your Password is required'
			}
		});
		var errors = req.validationErrors();
		if (errors) {
			var allErrors = [];
			errors.forEach(function (error) {
				allErrors.push({
					error: error.msg
				});
			});
			return res.status(400).json(allErrors);
		}
		next();
	},


	/**
   * Sends user input to the create account controller
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
   *
   * @param {Object} next - Callback function
   *
   * @returns {Object} - Object containing user information
   */
	sendUserInput: function sendUserInput(req, res, next) {
		var username = req.body.username.toLowerCase();

		return _User2.default.findOne({
			$or: [{ username: username }, { email: req.body.email }]
		}).then(function (user) {
			if (user) {
				if (user.email === req.body.email) {
					return res.status(409).send({
						message: 'Email already exist'
					});
				} else if (user.username === req.body.username) {
					return res.status(409).send({
						message: 'Username already exist'
					});
				}
			} else {
				var password = _bcrypt2.default.hashSync(req.body.password, 10);
				req.userInput = {
					username: username,
					fullName: req.body.fullName,
					email: req.body.email,
					password: password
				};
				next();
			}
		});
	},


	/**
 * Checks if article id is a number
 *
 * @param {Object} req - request
 *
 * @param {Object} res - response
 *
 * @param {Function} next - Call back function
 *
 * @returns { Object } - containing error message
 */
	checkArticleId: function checkArticleId(req, res, next) {
		var querier = req.body.articleId;
		if (!querier) {
			return res.status(400).send({
				message: 'Article ID is required'
			});
		}
		next();
	},


	/**
   *
   * @description - Validates User Input when adding a new article
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
   *
   * @param {Object} next - call back function
   *
   * @returns {Object} - Object containing error message
   */
	checkArticleInput: function checkArticleInput(req, res, next) {
		var articleError = 'Please provide an article title with 5 characters and above';
		req.checkBody({
			title: {
				notEmpty: true,
				isLength: {
					options: [{ min: 5 }],
					errorMessage: articleError
				},
				errorMessage: 'Article title is required'
			},
			content: {
				notEmpty: true,
				errorMessage: 'Article content is required'
			}
		});
		var errors = req.validationErrors();
		if (errors) {
			var allErrors = [];
			errors.forEach(function (error) {
				var errorMessage = error.msg;
				allErrors.push(errorMessage);
			});
			return res.status(400).json({
				message: allErrors[0]
			});
		}
		next();
	},


	/**
   * Sends user input to the add article controller
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
   *
   * @param {Object} next - Callback function
   *
   * @returns {Object} - Object containing article inout
   */
	sendArticleInput: function sendArticleInput(req, res, next) {
		var _req$body = req.body,
		    title = _req$body.title,
		    content = _req$body.content,
		    _id = _req$body._id;


		req.article = {
			_id: _id,
			title: title,
			content: content,
			author: req.decoded.currentUser.username
		};
		next();
	}
};

exports.default = Validation;
//# sourceMappingURL=Validation.js.map