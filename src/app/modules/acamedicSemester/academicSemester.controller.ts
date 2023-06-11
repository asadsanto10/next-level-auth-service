import { RequestHandler } from 'express';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterService } from './academicSemester.service';

export const createAcademicSemester: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const semesterData = req.body as IAcademicSemester;

		const result = await academicSemesterService.createAcademicSemester(semesterData);
		res
			.status(200)
			.json({ status: 'success', message: 'semester create successfully', data: result });
	} catch (error) {
		next(error);
	}
};
