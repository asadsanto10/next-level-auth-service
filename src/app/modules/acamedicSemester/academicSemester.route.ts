import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import {
	createAcademicSemester,
	deleteSemester,
	getAllSemester,
	getSemester,
	updateSemester,
} from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.get(
	'/semester',
	auth(
		ENUM_USER_ROLE.SUPER_ADMIN,
		ENUM_USER_ROLE.ADMIN,
		ENUM_USER_ROLE.FACULTY,
		ENUM_USER_ROLE.STUDENT
	),
	getAllSemester
);
router.get(
	'/semester/:id',
	auth(
		ENUM_USER_ROLE.SUPER_ADMIN,
		ENUM_USER_ROLE.ADMIN,
		ENUM_USER_ROLE.FACULTY,
		ENUM_USER_ROLE.STUDENT
	),
	getSemester
);

router.post(
	'/create-semester',
	validateRequest(academicSemesterValidation.createAcademicSemesterSchema),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	createAcademicSemester
);

router.patch(
	'/semester/:id',
	validateRequest(academicSemesterValidation.updateAcademicSemesterSchema),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	updateSemester
);

router.delete(
	'/semester/:id',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	deleteSemester
);

export const academicSemester = router;
