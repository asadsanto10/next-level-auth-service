import express, { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { academicSemester } from '../modules/acamedicSemester/academicSemester.route';
import { userRoutes } from '../modules/users/user.route';

const router = express.Router();

router.get('/health', (_req, res) => {
	res.json({ message: 'All ok' });
});

router.use('/users', userRoutes);
router.use('/academic', academicSemester);

// not found route
router.use((req: Request, res: Response, next: NextFunction) => {
	res.status(httpStatus.NOT_FOUND).json({
		status: false,
		message: 'Route not found',
		errorMessage: [
			{
				path: req.originalUrl,
				message: 'API not found!',
			},
		],
	});
	next();
});

export default router;