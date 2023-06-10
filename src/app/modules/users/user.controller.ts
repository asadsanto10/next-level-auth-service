/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { RequestHandler } from 'express';
import { IUser } from './user.interface';
import { userService } from './user.services';

export const createUser: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const data = req.body as IUser;
		const result = await userService.createUser(data);
		res.status(200).json({ statusbar: 'success', data: result });
	} catch (error) {
		// console.log(error);
		// res.status(400).json({ statusbar: 'error', error: 'unable to create user' });
		next(error);
	}
};
