import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import { createAdmin, createFaculty, createStudent } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
	'/create-student',
	validateRequest(userValidation.createStudentZodSchema),
	createStudent
);
router.post(
	'/create-faculty',
	validateRequest(userValidation.createFacultyZodSchema),
	createFaculty
);

router.post('/create-admin', validateRequest(userValidation.createAdminZodSchema), createAdmin);

export const userRoutes = router;
