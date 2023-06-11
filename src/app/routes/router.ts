import express from 'express';
import { academicSemester } from '../modules/acamedicSemester/academicSemester.route';
import { userRoutes } from '../modules/users/user.route';

const router = express.Router();

router.get('/health', (_req, res) => {
	res.json({ message: 'All ok' });
});

router.use('/users', userRoutes);
router.use('/academic', academicSemester);

export default router;
