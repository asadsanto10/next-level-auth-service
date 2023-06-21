import { RequestHandler } from 'express';
import httpStatus from 'http-status';

import { IPageOtions } from '../../../interface/pagination';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester, IAcademicSemesterFilter } from './academicSemester.interface';
import { academicSemesterService } from './academicSemester.service';
import { academicSemesterFilterField, paginationFiled } from './academicSemester.variable';

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
		const filters: IAcademicSemesterFilter = pick(req.query, academicSemesterFilterField);
		const pageOtions: IPageOtions = pick(req.query, paginationFiled);

		const result = await academicSemesterService.getAllSemester(filters, pageOtions);

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

export const getSemesterById: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await academicSemesterService.getSemesterById(id);

		sendResponse<IAcademicSemester>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'semester fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
