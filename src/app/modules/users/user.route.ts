import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import { createUser } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.post('/create-user', validateRequest(userValidation.createUserZodSchema), createUser);

export const userRoutes = router;
