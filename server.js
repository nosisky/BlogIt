var express = require('express');
var winston = require('winston');
var app = express();
var port = process.env.PORT || 3000;

app.listen(port);

winston.info('App connected to port: ' + port);
