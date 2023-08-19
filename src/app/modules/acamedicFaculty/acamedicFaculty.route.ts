import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import {
	createFaculty,
	deleteFaculty,
	getAllFaculty,
	getFaculty,
	updateFaculty,
} from './acamedicFaculty.controller';
import { academicFacultyValidation } from './acamedicFaculty.validation';

const router = express.Router();

router.post(
	'/create-faculty',
	validateRequest(academicFacultyValidation.createFacultyZodSchema),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	createFaculty
);
router.get(
	'/faculty',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
	getAllFaculty
);
router.get(
	'/faculty/:id',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
	getFaculty
);

router.patch(
	'/faculty/:id',
	validateRequest(academicFacultyValidation.updatefacultyZodSchema),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
	updateFaculty
);
router.delete('/faculty/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN), deleteFaculty);

export const acamedicFaculty = router;
