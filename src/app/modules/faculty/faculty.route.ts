import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import {
  deleteFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
} from './faculty.controller';
import { facultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/', getAllFaculties);
router.get('/:id', getSingleFaculty);

router.patch('/:id', validateRequest(facultyValidation.updateFacultyZodSchema), updateFaculty);
router.delete('/:id', deleteFaculty);
export const facultyRoutes = router;
