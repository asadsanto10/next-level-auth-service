import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { IPageOtions } from '../../../interface/pagination';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paginationFiled } from '../acamedicSemester/academicSemester.variable';
import { IAcademicFaculty, IAcademicFacultyFilter } from './acamedicFaculty.interface';
import { academicFaculty } from './acamedicFaculty.service';
import { academicFacultyFilterField } from './acamedicFaculty.variable';

export const createFaculty: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const data = req.body as IAcademicFaculty;
		const result = await academicFaculty.createFaculty(data);
		sendResponse<IAcademicFaculty>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'faculty create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllFaculty: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const filters: IAcademicFacultyFilter = pick(req.query, academicFacultyFilterField);
		const pageOtions: IPageOtions = pick(req.query, paginationFiled);

		const result = await academicFaculty.getAllFaculty(filters, pageOtions);

		sendResponse<IAcademicFaculty[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'faculty fetch successfully',
			data: result.data,
			meta: result.meta,
		});
	} catch (error) {
		next(error);
	}
};

export const getFaculty: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await academicFaculty.getFaculty(id);

		sendResponse<IAcademicFaculty>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'faculty fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const updateFaculty: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const updatedData = req.body as Partial<IAcademicFaculty>;

		const result = await academicFaculty.updateFaculty(id, updatedData);

		sendResponse<IAcademicFaculty>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'faculty updated successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteFaculty: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await academicFaculty.deleteFaculty(id);

		sendResponse<IAcademicFaculty>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'faculty deleted successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
