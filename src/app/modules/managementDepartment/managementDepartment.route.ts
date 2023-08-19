import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import {
	createDepartment,
	deleteDepartment,
	getAllDepartments,
	getSingleDepartment,
	updateDepartment,
} from './managementDepartment.controller';
import { managementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();

router.post(
	'/create-department',
	validateRequest(managementDepartmentValidation.createManagementDepartmentZodSchema),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	createDepartment
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
	getAllDepartments
);
router.get(
	'/:id',
	auth(
		ENUM_USER_ROLE.SUPER_ADMIN,
		ENUM_USER_ROLE.ADMIN,
		ENUM_USER_ROLE.FACULTY,
		ENUM_USER_ROLE.STUDENT
	),
	getSingleDepartment
);

router.patch(
	'/:id',
	validateRequest(managementDepartmentValidation.updateManagementDepartmentZodSchema),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	updateDepartment
);
router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN), deleteDepartment);

export const managementDepartmentRoutes = router;
