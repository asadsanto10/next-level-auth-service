import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paginationFiled } from '../acamedicSemester/academicSemester.variable';
import { IAdmin } from './admin.interface';
import { adminService } from './admin.service';
import { adminFilterableFields } from './admin.variable';

export const getAllAdmins: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const filters = pick(req.query, adminFilterableFields);
		const paginationOptions = pick(req.query, paginationFiled);

		const result = await adminService.getAllAdmins(filters, paginationOptions);

		sendResponse<IAdmin[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'admin fetch successfully',
			meta: result.meta,
			data: result.data,
		});
	} catch (error) {
		next(error);
	}
};

export const getSingleAdmin: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await adminService.getSingleAdmin(id);

		sendResponse<IAdmin>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'admin fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const updateAdmin: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;
		const updatedData = req.body;

		const result = await adminService.updateAdmin(id, updatedData);

		sendResponse<IAdmin>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'admin update successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteAdmin: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await adminService.deleteAdmin(id);

		sendResponse<IAdmin>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'admin delete successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
