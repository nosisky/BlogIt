import omit from 'lodash/omit';

import Article from '../models/Article';
import Comment from '../models/Comment';

const ArticleController = {
	/**
   * @description Creates a new article
   * 
   * @param {Object} req - request
   * 
   * @param {Object} res - response
   * 
   * @return {Object} - returns newly created article
   */
	createArticle(req, res) {
		const newArticle = new Article(req.article);
		newArticle.save().then((article) => {
			res.status(201).send({
				article,
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
	getAllArticles(req, res) {
		Article.find().then((articles) => {
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
	getAllComments(articleId) {
		return Comment.find({ articleId });
	},

	/**
   * Retrieves a single document 
   * 
   * @param {Object} req - request
   * 
   * @param {Object} res - response
   */
	getOneArticle(req, res) {
		Article.findOne({
			slug: req.params.slug
		})
			.then((article) => {
				if (article) {
					const newArticle = article.toObject();
					ArticleController.getAllComments(req.params.id).then((comment) => {
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
			})
			.catch((error) => res.status(500).send({ message: 'Invalid article ID supplied' }));
	},

	/**
   * @description - Edits an article
   * 
   * @param {Object} req - request
   * 
   * @param {Object} res - response
   */
	editArticle(req, res) {
		Article.findOneAndUpdate({ _id: req.body.articleId }, { $set: req.body })
			.then((updatedArticle) => {
				return res.status(200).send({
					updatedArticle,
					message: 'Article updated successfully'
				});
			})
			.catch(() => {
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
	deleteArticle(req, res) {
		Article.findOneAndRemove({ _id: req.body.articleId })
			.then((deletedArticle) => {
				return res.status(200).send({
					_id: deletedArticle._id,
					message: 'Article successfully deleted'
				});
			})
			.catch((error) => {
				return res.status(500).send({
					message: 'Error occured, article ID is invalid'
				});
			});
	}
};

export default ArticleController;
