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
		// res.status(200).json({ status: 'success', data: result });
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
