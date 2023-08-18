/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { userService } from './user.service';

export const createStudent: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { student, ...userData } = req.body as IUser;
		const result = await userService.createStudent(student as IStudent, userData);

		sendResponse(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'student create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const createFaculty: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { faculty, ...userData } = req.body;
		const result = await userService.createFaculty(faculty, userData);

		sendResponse(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'faculty create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const createAdmin: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { admin, ...userData } = req.body;
		const result = await userService.createAdmin(admin, userData);

		sendResponse(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'admin create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
