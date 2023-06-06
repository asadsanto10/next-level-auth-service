import cors from 'cors';

import express, { Application } from 'express';

import userRoute from './app/modules/users/user.route';
import connect from './db/connect';
import { logger } from './shared/logger';

const app: Application = express();
// server port
const port: number | string = process.env.PORT || 5005;
// database require
// eslint-disable-next-line @typescript-eslint/no-floating-promises
connect();
// parser
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// console.log(app.get('env'));
// route
const base = '/api/v1';

app.use(`${base}/users`, userRoute);

app.listen(port, () => {
	logger.info(`Listening on port ${port}`);
});
