import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();

const key = process.env.secretKey;

const Authorization = {
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
  isLoggedIn(req, res, next) {
    let token;
    const tokenAvailable = req.headers.authorization || req.headers['x-access-token'];

    if (req.headers.authorization) {
      [, token] = req.headers.authorization.split(' ');
    } else {
      token = tokenAvailable;
    }
    if (token) {
      jwt.verify(token, key, (error, decoded) => {
        if (error) {
          res.status(401).send({
            message: 'Failed to Authenticate Token',
            error
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
  isAdmin(req, res, next) {
    const decodedToken = req.decoded;
    if (decodedToken.currentUser.isAdmin) {
      next();
    } else {
      return res.status(403).send({
        message: 'You do not have permission to perform that operation'
      });
    }
  }
};

export default Authorization;
