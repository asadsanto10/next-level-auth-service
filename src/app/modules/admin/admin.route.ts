import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import { deleteAdmin, getAllAdmins, getSingleAdmin, updateAdmin } from './admin.controller';
import { adminValidation } from './admin.validation';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), getAllAdmins);
router.get('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), getSingleAdmin);

router.patch(
	'/:id',
	validateRequest(adminValidation.updateAdmin),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	updateAdmin
);

router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN), deleteAdmin);

export const adminRoutes = router;
