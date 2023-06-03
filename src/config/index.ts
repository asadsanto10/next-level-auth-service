import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const variable = {
	port: process.env.PORT,
	dataBaseUrl: process.env.DATABASE_URL,
	defaultStudentPassword: process.env.DEFAULT_STUDENT_PASSWORD,
};

export default variable;
