'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _CommentController = require('../controllers/CommentController');

var _CommentController2 = _interopRequireDefault(_CommentController);

var _Authorization = require('../middleware/Authorization');

var _Authorization2 = _interopRequireDefault(_Authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isLoggedIn = _Authorization2.default.isLoggedIn;
var addComment = _CommentController2.default.addComment,
    editComment = _CommentController2.default.editComment,
    deleteComment = _CommentController2.default.deleteComment,
    getAllComments = _CommentController2.default.getAllComments;


var commentRouter = _express2.default.Router();

commentRouter.route('/').post(isLoggedIn, addComment).delete(isLoggedIn, deleteComment).put(isLoggedIn, editComment);

exports.default = commentRouter;
//# sourceMappingURL=commentRouter.js.map