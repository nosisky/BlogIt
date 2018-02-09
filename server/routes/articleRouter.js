import express from 'express';

import ArticleController from '../controllers/ArticleController';

import Validation from '../middleware/Validation';
import Authorization from '../middleware/Authorization';

const { checkArticleId, checkArticleInput, sendArticleInput } = Validation;
const { isLoggedIn } = Authorization;

const { createArticle } = ArticleController;

const articleRouter = express.Router();

//Create a new article
articleRouter.route('/').post(isLoggedIn, checkArticleInput, createArticle, sendArticleInput);

// //Modify article
// articleRouter.route('/').put(checkArticleId);

// //Delete article
// articleRouter.route('/').delete(checkArticleId);

export default articleRouter;
