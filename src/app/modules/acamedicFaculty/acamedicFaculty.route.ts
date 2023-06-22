import express from 'express';
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
	createFaculty
);
router.get('/faculty', getAllFaculty);
router.get('/faculty/:id', getFaculty);
router.patch(
	'/faculty/:id',
	validateRequest(academicFacultyValidation.updatefacultyZodSchema),
	updateFaculty
);
router.delete('/faculty/:id', deleteFaculty);

export const acamedicFaculty = router;
