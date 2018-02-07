import express from 'express';
import winston from 'winston';
const app = express();
const port = process.env.PORT || 3000;

app.listen(port);

app.get('/', (req, res) => {
	res.send({
		message: 'Connected to end points'
	});
});

winston.info('App connected to port: ' + port);
