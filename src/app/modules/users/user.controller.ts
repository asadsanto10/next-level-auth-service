/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { userService } from './user.service';

export const createUser: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const data = req.body as IUser;
		const result = await userService.createUser(data);
		// res.status(200).json({ status: 'success', data: result });
		sendResponse(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'user create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
