import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import omit from 'lodash/omit';

import User from '../models/User';

dotenv.load();

const secret = process.env.secretKey;

const UserController = {
  /**
   * @description - Adds a new user to the database
   *
   * @param  {object} req - request object
   *
   * @param  {object} res - response object
   *
   * @return {Object} - Object containing user detail
   *
   * Route: POST: /users/signup
   */
  create(req, res) {
    const newUser = new User(req.userInput);
    newUser
      .save(req.userInput)
      .then((user) => {
        const currentUser = omit(user.toObject(), ['password', 'createdDate']);
        const token = jwt.sign(
          {
            currentUser,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
          },
          secret
        );
        return res.status(201).send({
          message: 'Signed up successfully',
          token
        });
      })
      .catch((error) => {
        res.status(500).send({
          error
        });
      });
  },

  /**
   * @description - Authenticates user login information
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Object containing user details
   *
   * Route: POST: /users/signin
   */
  login(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(401).json({
        message: 'Please provide your username or password to login'
      });
    }

    const username = req.body.username.toLowerCase();

    return User.findOne({
      username
    })
      .then((user) => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          const currentUser = omit(user.toObject(), ['password', 'createdDate']);
          const token = jwt.sign(
            {
              currentUser,
              exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
            },
            secret
          );
          return res.status(200).send({
            message: 'Logged In Successfully',
            token
          });
        }
        return res.status(401).json({
          message: 'Invalid Credentials.'
        });
      })
      .catch(error => res.status(500).send(error));
  }
};

export default UserController;
