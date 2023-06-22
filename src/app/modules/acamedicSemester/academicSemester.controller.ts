import { RequestHandler } from 'express';
import httpStatus from 'http-status';

import ApiError from '../../../errors/apiError';
import { IPageOtions } from '../../../interface/pagination';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester, IAcademicSemesterFilter } from './academicSemester.interface';
import { academicSemesterService } from './academicSemester.service';
import {
	academicSemesterFilterField,
	academicSemesterTitleCodeMapper,
	paginationFiled,
} from './academicSemester.variable';

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

export const getSemester: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await academicSemesterService.getSemester(id);

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

export const updateSemester: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const updatedData = req.body as Partial<IAcademicSemester>;

		if (
			updatedData.title &&
			updatedData.code &&
			academicSemesterTitleCodeMapper[updatedData.title] !== updatedData.code
		) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'invalid semester code');
		}

		const result = await academicSemesterService.updateSemester(id, updatedData);

		sendResponse<IAcademicSemester>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'semester updated successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteSemester: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await academicSemesterService.deleteSemester(id);

		sendResponse<IAcademicSemester>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'semester deleted successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
