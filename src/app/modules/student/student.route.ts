import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import {
  deleteStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
} from './student.controller';

import { studentValidaion } from './student.validation';

const router = express.Router();

router.get('/:id', getSingleStudent);
router.get('/', getAllStudents);

router.patch('/:id', validateRequest(studentValidaion.updateStudentZodSchema), updateStudent);
router.delete('/:id', deleteStudent);
export const studentRoutes = router;
