import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester, IPageOtions } from './academicSemester.interface';
import { academicSemesterService } from './academicSemester.service';

export const createAcademicSemester: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const semesterData = req.body as IAcademicSemester;

		const result = await academicSemesterService.createAcademicSemester(semesterData);

		sendResponse<IAcademicSemester>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'semester create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllSemester: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const pageOtions: IPageOtions = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

		const result = await academicSemesterService.getAllSemester(pageOtions);

		sendResponse<IAcademicSemester[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'semester fetch successfully',
			data: result.data,
			meta: result.meta,
		});
	} catch (error) {
		next(error);
	}
};
