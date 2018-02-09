import Article from '../models/Article';

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

	editArticle(req, res) {},

	deleteArticle(req, res) {
		Article.deleteOne({ _id: req.body.id }).then(() => {
			res.send({
				message: 'Article successfully deleted'
			});
		});
	}
};

export default ArticleController;
