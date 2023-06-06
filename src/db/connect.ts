import mongoose from 'mongoose';
import variable from '../config';
import { errorlogger, logger } from '../shared/logger';

const connect = async () => {
	try {
		await mongoose.connect(variable.dataBaseUrl as string);
		logger.info('Database connection established');
	} catch (error) {
		errorlogger.error(`Database connection: ${error as string}`);
	}
};

export default connect;
