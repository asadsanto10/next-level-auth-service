import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import { changePassword, getRefreshToken, loginUser } from './auth.controller';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post('/login', validateRequest(authValidation.loginZodSchema), loginUser);

router.post(
	'/refresh-token',
	validateRequest(authValidation.refreshTokenZodSchema),
	getRefreshToken
);

router.post(
	'/change-password',
	validateRequest(authValidation.changePasswordZodSchema),
	auth(
		ENUM_USER_ROLE.SUPER_ADMIN,
		ENUM_USER_ROLE.ADMIN,
		ENUM_USER_ROLE.FACULTY,
		ENUM_USER_ROLE.STUDENT
	),
	changePassword
);

export const authRoutes = router;
