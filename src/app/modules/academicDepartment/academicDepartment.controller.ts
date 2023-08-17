import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { IPageOtions } from '../../../interface/pagination';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paginationFiled } from '../acamedicSemester/academicSemester.variable';
import { IAcademicDepartment, IAcademicDepartmentFilters } from './academicDepartment.interface';
import { academicDepartmentService } from './academicDepartment.service';
import { academicDepertmentFilterField } from './academicDepartment.variable';

export const createDepartment: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const data = req.body as IAcademicDepartment;
		const result = await academicDepartmentService.createDepartment(data);
		sendResponse<IAcademicDepartment>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'depertment create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllDepertment: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const filters: IAcademicDepartmentFilters = pick(req.query, academicDepertmentFilterField);
		const pageOtions: IPageOtions = pick(req.query, paginationFiled);

		const result = await academicDepartmentService.getAllDepertment(filters, pageOtions);

		sendResponse<IAcademicDepartment[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'depertment fetch successfully',
			data: result.data,
			meta: result.meta,
		});
	} catch (error) {
		next(error);
	}
};

export const getDepertment: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await academicDepartmentService.getDepertment(id);

		sendResponse<IAcademicDepartment>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'depertment fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const updateDepertment: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const updatedData = req.body as Partial<IAcademicDepartment>;

		const result = await academicDepartmentService.updateDepertment(id, updatedData);

		sendResponse<IAcademicDepartment>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'depertment updated successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteDepertment: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await academicDepartmentService.deleteDepertment(id);

		sendResponse<IAcademicDepartment>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'depertment deleted successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
