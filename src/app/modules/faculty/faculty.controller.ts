import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paginationFiled } from '../acamedicSemester/academicSemester.variable';
import { IFaculty } from './faculty.interface';
import { facultyService } from './faculty.service';
import { facultyFilterableFields } from './faculty.variable';

export const getAllFaculties: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const filters = pick(req.query, facultyFilterableFields);
		const paginationOptions = pick(req.query, paginationFiled);

		const result = await facultyService.getAllFaculties(filters, paginationOptions);

		sendResponse<IFaculty[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'faculty fetch successfully',
			meta: result.meta,
			data: result.data,
		});
	} catch (error) {
		next(error);
	}
};

export const getSingleFaculty: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await facultyService.getSingleFaculty(id);

		sendResponse<IFaculty>(res, {
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
		const updatedData = req.body;

		const result = await facultyService.updateFaculty(id, updatedData);

		sendResponse<IFaculty>(res, {
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
		const result = await facultyService.deleteFaculty(id);

		sendResponse<IFaculty>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'faculty delete successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
