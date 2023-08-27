import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paginationFiled } from '../acamedicSemester/academicSemester.variable';
import { IManagementDepartment } from './managementDepartment.interface';
import { managementDepartmentService } from './managementDepartment.service';
import { managementDepartmentFilterableFields } from './managementDepartment.variable';

export const createDepartment: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { ...departmentData } = req.body as IManagementDepartment;
		const result = await managementDepartmentService.createDepartment(departmentData);
		sendResponse(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'department create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllDepartments: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const filters = pick(req.query, managementDepartmentFilterableFields);
		const paginationOptions = pick(req.query, paginationFiled);

		const result = await managementDepartmentService.getAllDepartments(filters, paginationOptions);
		sendResponse(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'department fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getSingleDepartment: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await managementDepartmentService.getSingleDepartment(id);
		sendResponse(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'department fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const updateDepartment: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;
		const updatedData = req.body;

		const result = await managementDepartmentService.updateDepartment(id, updatedData);
		sendResponse(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Management department updated successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteDepartment: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await managementDepartmentService.deleteDepartment(id);
		sendResponse(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'department create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
