import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import { createAdmin, createFaculty, createStudent } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
	'/create-student',
	validateRequest(userValidation.createStudentZodSchema),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	createStudent
);
router.post(
	'/create-faculty',
	validateRequest(userValidation.createFacultyZodSchema),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	createFaculty
);

router.post(
	'/create-admin',
	validateRequest(userValidation.createAdminZodSchema),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	createAdmin
);

export const userRoutes = router;
