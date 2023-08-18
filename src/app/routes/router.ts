import express, { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { acamedicFaculty } from '../modules/acamedicFaculty/acamedicFaculty.route';

import { academicDepartment } from '../modules/academicDepartment/academicDepartment.route';
import { academicSemester } from '../modules/acamedicSemester/academicSemester.route';
import { facultyRoutes } from '../modules/faculty/faculty.route';
import { studentRoutes } from '../modules/student/student.route';
import { userRoutes } from '../modules/users/user.route';

const router = express.Router();

router.get('/health', (_req, res) => {
	res.json({ message: 'All ok' });
});

router.use('/users', userRoutes);
router.use('/students', studentRoutes);
router.use('/academic-semester', academicSemester);
router.use('/academic-faculties', acamedicFaculty);
router.use('/academic-departments', academicDepartment);
// router.use('/management-departments');
router.use('/faculties', facultyRoutes);
// router.use('/admins');

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
