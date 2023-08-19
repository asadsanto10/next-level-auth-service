import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import variable from '../../../config';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { authService } from './auth.service';

export const loginUser: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { ...loginData } = req.body as ILoginUser;
		const result = await authService.loginUser(loginData);
		const { refreshToken, ...others } = result;

		// set refresh token into cookie
		const cookieOptions = {
			secure: variable.nodeENV === 'production',
			httpOnly: true,
		};

		res.cookie('refreshToken', refreshToken, cookieOptions);

		sendResponse<ILoginUserResponse>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'user login successfully',
			data: others,
		});
	} catch (error) {
		next(error);
	}
};

export const getRefreshToken: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { refreshToken } = req.cookies;
		const result = await authService.generateRefreshToken(refreshToken);

		// set refresh token into cookie
		const cookieOptions = {
			secure: variable.nodeENV === 'production',
			httpOnly: true,
		};

		res.cookie('refreshToken', refreshToken, cookieOptions);

		sendResponse<IRefreshTokenResponse>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'user login successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
