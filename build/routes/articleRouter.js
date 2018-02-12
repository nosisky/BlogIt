'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ArticleController = require('../controllers/ArticleController');

var _ArticleController2 = _interopRequireDefault(_ArticleController);

var _Validation = require('../middleware/Validation');

var _Validation2 = _interopRequireDefault(_Validation);

var _Authorization = require('../middleware/Authorization');

var _Authorization2 = _interopRequireDefault(_Authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkArticleId = _Validation2.default.checkArticleId,
    checkArticleInput = _Validation2.default.checkArticleInput,
    sendArticleInput = _Validation2.default.sendArticleInput;
var isLoggedIn = _Authorization2.default.isLoggedIn;
var createArticle = _ArticleController2.default.createArticle,
    getOneArticle = _ArticleController2.default.getOneArticle,
    deleteArticle = _ArticleController2.default.deleteArticle,
    getAllArticles = _ArticleController2.default.getAllArticles,
    editArticle = _ArticleController2.default.editArticle;


var articleRouter = _express2.default.Router();

articleRouter.route('/').post(isLoggedIn, checkArticleInput, sendArticleInput, createArticle).delete(checkArticleId, deleteArticle).get(getAllArticles).put(isLoggedIn, checkArticleId, editArticle);

articleRouter.route('/:slug').get(getOneArticle);

exports.default = articleRouter;
//# sourceMappingURL=articleRouter.js.map