import express from 'express';
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
	createDepartment
);
router.get('/depertment', getAllDepertment);
router.get('/depertment/:id', getDepertment);
router.patch(
	'/depertment/:id',
	validateRequest(academicDepartmentValidation.updateAcademicDepartmentZodSchema),
	updateDepertment
);
router.delete('/depertment/:id', deleteDepertment);

export const academicDepartment = router;
