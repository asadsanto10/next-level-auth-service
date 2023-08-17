import express from 'express';
import { getAllStudents, getSingleStudent } from './student.controller';

const router = express.Router();

router.get('/:id', getSingleStudent);
router.get('/', getAllStudents);

// router.patch('/:id', validateRequest(studentValidaion.updateStudentZodSchema), updateStudent);
// router.delete('/:id', deleteStudent);
export const studentRoutes = router;
