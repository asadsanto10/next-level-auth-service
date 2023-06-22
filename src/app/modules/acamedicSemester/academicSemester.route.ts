import express from 'express';
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

router.get('/semester', getAllSemester);
router.get('/semester/:id', getSemester);
router.post(
	'/create-semester',
	validateRequest(academicSemesterValidation.createAcademicSemesterSchema),
	createAcademicSemester
);

router.patch(
	'/semester/:id',
	validateRequest(academicSemesterValidation.updateAcademicSemesterSchema),
	updateSemester
);

router.delete('/semester/:id', deleteSemester);

export const academicSemester = router;
