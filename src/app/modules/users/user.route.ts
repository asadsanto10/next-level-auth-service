import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import { createStudent } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
	'/create-student',
	validateRequest(userValidation.createStudentZodSchema),
	createStudent
);
router.post(
	'/create-faculty',
	validateRequest(userValidation.createStudentZodSchema),
	createStudent
);

export const userRoutes = router;
