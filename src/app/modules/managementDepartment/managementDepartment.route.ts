import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import { createDepartment, deleteDepartment, getAllDepartments, getSingleDepartment, updateDepartment } from './managementDepartment.controller';
import { managementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();

router.post(
	'/create-department',
	validateRequest(managementDepartmentValidation.createManagementDepartmentZodSchema),
	createDepartment
);

router.get('/', getAllDepartments);
router.get('/:id', getSingleDepartment);
router.patch(
	'/:id',
	validateRequest(managementDepartmentValidation.updateManagementDepartmentZodSchema),
	updateDepartment
);
router.delete('/:id', deleteDepartment);

export const managementDepartmentRoutes = router;
