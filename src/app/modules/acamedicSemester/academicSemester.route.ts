import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import { createAcademicSemester } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
	'/create-semester',
	validateRequest(academicSemesterValidation.createAcademicSemesterSchema),
	createAcademicSemester
);

export const academicSemester = router;
