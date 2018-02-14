import bcrypt from 'bcrypt';


import User from '../models/User';

const Validation = {
  /**
   *
   * @description - Validates Article Input
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
   *
   * @param {Object} next - call back function
   *
   * @returns {Object} - Object containing error message
   */
  checkUserInput(req, res, next) {
    let userNameError = '';
    userNameError = 'Please provide a username with atleast 4 characters.';
    req.assert('passwordConfirm', 'Passwords must match').equals(req.body.password);

    req.checkBody({
      username: {
        notEmpty: true,
        isLength: {
          options: [{ min: 4 }],
          errorMessage: userNameError
        },
        errorMessage: 'Your Username is required'
      },
      email: {
        notEmpty: true,
        isEmail: {
          errorMessage: 'Provide a valid a Email Adrress'
        },
        errorMessage: 'Your Email Address is required'
      },
      password: {
        notEmpty: true,
        isLength: {
          options: [{ min: 4 }],
          errorMessage: 'Provide a valid password with minimum of 4 characters'
        },
        errorMessage: 'Your Password is required'
      }
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        allErrors.push({
          error: error.msg
        });
      });
      return res.status(400).json(allErrors);
    }
    next();
  },

  /**
   * Sends user input to the create account controller
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
   *
   * @param {Object} next - Callback function
   *
   * @returns {Object} - Object containing user information
   */
  sendUserInput(req, res, next) {
    const username = req.body.username.toLowerCase();

    return User.findOne({
      $or: [{ username }, { email: req.body.email }]
    }).then((user) => {
      if (user) {
        if (user.email === req.body.email) {
          return res.status(409).send({
            message: 'Email already exist'
          });
        } else if (user.username === req.body.username) {
          return res.status(409).send({
            message: 'Username already exist'
          });
        }
      } else {
        const password = bcrypt.hashSync(req.body.password, 10);
        req.userInput = {
          username,
          fullName: req.body.fullName,
          email: req.body.email,
          password
        };
        next();
      }
    });
  },

  /**
 * Checks if article id is a number
 *
 * @param {Object} req - request
 *
 * @param {Object} res - response
 *
 * @param {Function} next - Call back function
 *
 * @returns { Object } - containing error message
 */
  checkArticleId(req, res, next) {
    const querier = req.body.articleId;
    if (!querier) {
      return res.status(400).send({
        message: 'Article ID is required'
      });
    }
    next();
  },

  /**
   *
   * @description - Validates User Input when adding a new article
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
   *
   * @param {Object} next - call back function
   *
   * @returns {Object} - Object containing error message
   */
  checkArticleInput(req, res, next) {
    const articleError = 'Please provide an article title with 5 characters and above';
    req.checkBody({
      title: {
        notEmpty: true,
        isLength: {
          options: [{ min: 5 }],
          errorMessage: articleError
        },
        errorMessage: 'Article title is required'
      },
      content: {
        notEmpty: true,
        errorMessage: 'Article content is required'
      }
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(400).json({
        message: allErrors[0]
      });
    }
    next();
  },

  /**
   * Sends user input to the add article controller
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
   *
   * @param {Object} next - Callback function
   *
   * @returns {Object} - Object containing article inout
   */
  sendArticleInput(req, res, next) {
    const { title, content, _id } = req.body;

    req.article = {
      _id,
      title,
      content,
      author: req.decoded.currentUser.username
    };
    next();
  }
};

export default Validation;
