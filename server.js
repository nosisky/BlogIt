import express from 'express';
import winston from 'winston';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import userRouter from './server/routes/userRouter';
import articleRouter from './server/routes/articleRouter';
// import commentRouter from './server/routes/commentRouter';

dotenv.load();

mongoose.connect(process.env.DATABASE_URL);

let db = mongoose.connection;

const server = express();
const port = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(validator());

server.use('/api/v1/users', userRouter);
server.use('/api/v1/articles', articleRouter);
// server.use('/api/v1/comments', commentRouter);

server.listen(port);

server.get('/', (req, res) => {
	res.send({
		message: 'Welcome, Connected to end points'
	});
});

winston.info('App connected to port: ' + port);
