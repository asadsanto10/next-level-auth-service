import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import {
	createAcademicSemester,
	getAllSemester,
	getSemesterById,
} from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.get('/semester', getAllSemester);
router.get('/semester/:id', getSemesterById);
router.post(
	'/create-semester',
	validateRequest(academicSemesterValidation.createAcademicSemesterSchema),
	createAcademicSemester
);

export const academicSemester = router;
