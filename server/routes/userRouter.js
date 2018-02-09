import express from 'express';

import Validation from '../middleware/Validation';

import UserController from '../controllers/UserController';

const { checkUserInput, sendUserInput } = Validation;

const { create, login } = UserController;

const userRouter = express.Router();

userRouter.route('/signup').post(checkUserInput, sendUserInput, create);

userRouter.route('/signin').post(login);

export default userRouter;
