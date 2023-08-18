import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import { createFaculty, createStudent } from './user.controller';
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

export const userRoutes = router;
