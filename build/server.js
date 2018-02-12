'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _webpackConfig = require('../webpack.config.dev');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _userRouter = require('./routes/userRouter');

var _userRouter2 = _interopRequireDefault(_userRouter);

var _articleRouter = require('./routes/articleRouter');

var _articleRouter2 = _interopRequireDefault(_articleRouter);

var _commentRouter = require('./routes/commentRouter');

var _commentRouter2 = _interopRequireDefault(_commentRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

_mongoose2.default.connect(process.env.DATABASE_URL);

var db = _mongoose2.default.connection;

var server = (0, _express2.default)();
var port = process.env.PORT || 3000;

server.use(_express2.default.static('/client/')); // configure static files folder
server.use(_express2.default.static(_path2.default.join(__dirname, '../client/public'))); // configure static files folder

if (process.env.NODE_ENV === 'development') {
	server.use((0, _webpackDevMiddleware2.default)((0, _webpack2.default)(_webpackConfig2.default)));
}

server.use(_bodyParser2.default.urlencoded({ extended: true }));
server.use(_bodyParser2.default.json());
server.use((0, _expressValidator2.default)());

server.use('/api/v1/users', _userRouter2.default);
server.use('/api/v1/articles', _articleRouter2.default);
server.use('/api/v1/comments', _commentRouter2.default);

server.get('*', function (req, res) {
	res.sendFile(_path2.default.join(__dirname, '../client/index.html'));
});

server.listen(port);

_winston2.default.info('App connected to port: ' + port);
//# sourceMappingURL=server.js.map