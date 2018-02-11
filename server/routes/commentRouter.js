import express from 'express';

import CommentController from '../controllers/CommentController';
import Authorization from '../middleware/Authorization';

const { isLoggedIn } = Authorization;

const { addComment, editComment, deleteComment, getAllComments } = CommentController;

const commentRouter = express.Router();

commentRouter.route('/').post(isLoggedIn, addComment).delete(isLoggedIn, deleteComment).put(isLoggedIn, editComment);

export default commentRouter;
