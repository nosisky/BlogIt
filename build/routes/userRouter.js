'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Validation = require('../middleware/Validation');

var _Validation2 = _interopRequireDefault(_Validation);

var _UserController = require('../controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkUserInput = _Validation2.default.checkUserInput,
    sendUserInput = _Validation2.default.sendUserInput;
var create = _UserController2.default.create,
    login = _UserController2.default.login;


var userRouter = _express2.default.Router();

userRouter.route('/signup').post(checkUserInput, sendUserInput, create);

userRouter.route('/signin').post(login);

exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map