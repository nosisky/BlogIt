'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _Article = require('../models/Article');

var _Article2 = _interopRequireDefault(_Article);

var _Comment = require('../models/Comment');

var _Comment2 = _interopRequireDefault(_Comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArticleController = {
	/**
   * @description Creates a new article
   * 
   * @param {Object} req - request
   * 
   * @param {Object} res - response
   * 
   * @return {Object} - returns newly created article
   */
	createArticle: function createArticle(req, res) {
		var newArticle = new _Article2.default(req.article);
		newArticle.save().then(function (article) {
			res.status(201).send({
				article: article,
				message: 'Article created successfully'
			});
		});
	},


	/**
   * @description - Fetches all articles in the database
   * 
   * @param {Object} req - request
   * 
   * @param {Object} res - response
   * 
   * @returns {Array} - Array of all articles in the database
   */
	getAllArticles: function getAllArticles(req, res) {
		_Article2.default.find().then(function (articles) {
			if (articles.length > 0) {
				return res.status(200).send(articles);
			} else {
				return res.status(404).send({
					message: 'There is no article in the database'
				});
			}
		});
	},


	/**
   * @description - Fetches all comments in the database
   * 
   * @param {Object} req - request
   * 
   * @param {Object} res - response
   * 
   * @returns {Array} - Array of all articles in the database
   */
	getAllComments: function getAllComments(articleId) {
		return _Comment2.default.find({ articleId: articleId });
	},


	/**
   * Retrieves a single document 
   * 
   * @param {Object} req - request
   * 
   * @param {Object} res - response
   */
	getOneArticle: function getOneArticle(req, res) {
		_Article2.default.findOne({
			slug: req.params.slug
		}).then(function (article) {
			if (article) {
				var newArticle = article.toObject();
				ArticleController.getAllComments(req.params.id).then(function (comment) {
					if (comment) {
						newArticle.comments = comment;
						return res.status(200).send(newArticle);
					} else {
						return res.status(404).send({
							message: 'Article not found'
						});
					}
				});
			}
		}).catch(function (error) {
			return res.status(500).send({ message: 'Invalid article ID supplied' });
		});
	},


	/**
   * @description - Edits an article
   * 
   * @param {Object} req - request
   * 
   * @param {Object} res - response
   */
	editArticle: function editArticle(req, res) {
		_Article2.default.findOneAndUpdate({ _id: req.body.articleId }, { $set: req.body }).then(function (updatedArticle) {
			return res.status(200).send({
				updatedArticle: updatedArticle,
				message: 'Article updated successfully'
			});
		}).catch(function () {
			return res.status(500).send({
				message: 'error occured, article ID is invalid'
			});
		});
	},


	/**
   * @description - Deletes an article
   * 
   * @param {Object} req - request
   * 
   * @param {Object} res - response
   */
	deleteArticle: function deleteArticle(req, res) {
		_Article2.default.findOneAndRemove({ _id: req.body.articleId }).then(function (deletedArticle) {
			return res.status(200).send({
				_id: deletedArticle._id,
				message: 'Article successfully deleted'
			});
		}).catch(function (error) {
			return res.status(500).send({
				message: 'Error occured, article ID is invalid'
			});
		});
	}
};

exports.default = ArticleController;
//# sourceMappingURL=ArticleController.js.map