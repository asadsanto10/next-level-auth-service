import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import {
	createDepartment,
	deleteDepertment,
	getAllDepertment,
	getDepertment,
	updateDepertment,
} from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
	'/create-department',
	validateRequest(academicDepartmentValidation.createAcademicDepartmentZodSchema),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	createDepartment
);
router.get('/depertment', getAllDepertment);
router.get('/depertment/:id', getDepertment);

router.patch(
	'/depertment/:id',
	validateRequest(academicDepartmentValidation.updateAcademicDepartmentZodSchema),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	updateDepertment
);
router.delete('/depertment/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN), deleteDepertment);

export const academicDepartment = router;
