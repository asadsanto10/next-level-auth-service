import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import { deleteAdmin, getAllAdmins, getSingleAdmin, updateAdmin } from './admin.controller';
import { adminValidation } from './admin.validation';

const router = express.Router();

router.get('/', getAllAdmins);
router.get('/:id', getSingleAdmin);

router.patch('/:id', validateRequest(adminValidation.updateAdmin), updateAdmin);

router.delete('/:id', deleteAdmin);

export const adminRoutes = router;
