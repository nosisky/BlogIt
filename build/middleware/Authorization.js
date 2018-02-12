'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

var key = process.env.secretKey;

var Authorization = {
	/**
   * @description - Checks if logged in user has valid AUTH token
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {null} - null
   */
	isLoggedIn: function isLoggedIn(req, res, next) {
		var token = void 0;
		var tokenAvailable = req.headers.authorization || req.headers['x-access-token'];

		if (req.headers.authorization) {
			var _req$headers$authoriz = req.headers.authorization.split(' ');

			var _req$headers$authoriz2 = _slicedToArray(_req$headers$authoriz, 2);

			token = _req$headers$authoriz2[1];
		} else {
			token = tokenAvailable;
		}
		if (token) {
			_jsonwebtoken2.default.verify(token, key, function (error, decoded) {
				if (error) {
					res.status(401).send({
						message: 'Failed to Authenticate Token',
						error: error
					});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			return res.status(401).send({
				message: 'Access denied, Authentication token does not exist'
			});
		}
	},


	/**
   * @description - Checks if currently logged in user is an admin
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {Object} - Object containing message
   */
	isAdmin: function isAdmin(req, res, next) {
		var decodedToken = req.decoded;
		if (decodedToken.currentUser.isAdmin) {
			next();
		} else {
			return res.status(403).send({
				message: 'You do not have permission to perform that operation'
			});
		}
	}
};

exports.default = Authorization;
//# sourceMappingURL=Authorization.js.map