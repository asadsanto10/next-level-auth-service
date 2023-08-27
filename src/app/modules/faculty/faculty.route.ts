import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
// prettier-ignore
import {
  deleteFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
} from './faculty.controller';
import { facultyValidation } from './faculty.validation';

const router = express.Router();

router.get(
	'/',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.FACULTY, ENUM_USER_ROLE.ADMIN),
	getAllFaculties
);
router.get(
	'/:id',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
	getSingleFaculty
);

router.patch(
	'/:id',
	validateRequest(facultyValidation.updateFacultyZodSchema),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	updateFaculty
);
router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN), deleteFaculty);
export const facultyRoutes = router;
