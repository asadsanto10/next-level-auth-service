import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import {
  deleteStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
} from './student.controller';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import { studentValidaion } from './student.validation';

const router = express.Router();

router.get(
	'/:id',
	auth(
		ENUM_USER_ROLE.SUPER_ADMIN,
		ENUM_USER_ROLE.ADMIN,
		ENUM_USER_ROLE.FACULTY,
		ENUM_USER_ROLE.FACULTY,
		ENUM_USER_ROLE.STUDENT
	),
	getSingleStudent
);
router.get(
	'/',
	auth(
		ENUM_USER_ROLE.SUPER_ADMIN,
		ENUM_USER_ROLE.ADMIN,
		ENUM_USER_ROLE.FACULTY,
		ENUM_USER_ROLE.FACULTY,
		ENUM_USER_ROLE.STUDENT
	),
	getAllStudents
);

router.patch(
	'/:id',
	validateRequest(studentValidaion.updateStudentZodSchema),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	updateStudent
);

router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN), deleteStudent);
export const studentRoutes = router;
