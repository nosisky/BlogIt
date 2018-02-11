import express from 'express';

import ArticleController from '../controllers/ArticleController';

import Validation from '../middleware/Validation';
import Authorization from '../middleware/Authorization';

const { checkArticleId, checkArticleInput, sendArticleInput } = Validation;
const { isLoggedIn } = Authorization;

const { createArticle, getOneArticle, deleteArticle, getAllArticles, editArticle } = ArticleController;

const articleRouter = express.Router();

articleRouter
	.route('/')
	.post(isLoggedIn, checkArticleInput, sendArticleInput, createArticle)
	.delete(checkArticleId, deleteArticle)
	.get(getAllArticles)
	.put(isLoggedIn, checkArticleId, editArticle);

articleRouter.route('/:slug').get(getOneArticle);

export default articleRouter;
