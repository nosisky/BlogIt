import express from 'express';

import ArticleController from '../controllers/ArticleController';

import Validation from '../middleware/Validation';
import Authorization from '../middleware/Authorization';

const { checkArticleId, checkArticleInput, sendArticleInput } = Validation;
const { isLoggedIn, isAdmin } = Authorization;

const {
  createArticle, getOneArticle, deleteArticle, getAllArticles, editArticle
} = ArticleController;

const articleRouter = express.Router();

articleRouter
  .route('/')
  .post(isLoggedIn, checkArticleInput, sendArticleInput, createArticle)
  .delete(isLoggedIn, isAdmin, checkArticleId, deleteArticle)
  .get(getAllArticles)
  .put(isLoggedIn, isAdmin, checkArticleId, editArticle);

articleRouter.route('/:slug').get(getOneArticle);

export default articleRouter;
