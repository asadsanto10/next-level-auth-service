import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import { getRefreshToken, loginUser } from './auth.controller';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post('/login', validateRequest(authValidation.loginZodSchema), loginUser);

router.post(
	'/refresh-token',
	validateRequest(authValidation.refreshTokenZodSchema),
	getRefreshToken
);

// router.get('/', AdminController.getAllAdmins);

// router.delete('/:id', AdminController.deleteAdmin);

// router.patch(
//   '/:id',
//   validateRequest(AdminValidation.updateAdmin),
//   AdminController.updateAdmin
// );

export const authRoutes = router;
