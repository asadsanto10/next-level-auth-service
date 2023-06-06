/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Request, Response } from 'express';
import { IUser } from './users.interface';
import userService from './users.services';

export const createUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const data = req.body as IUser;
		const result = await userService.createUser(data);
		res.status(200).json({ statusbar: 'success', data: result });
	} catch (error) {
		// console.log(error);
		res.status(400).json({ statusbar: 'error', error: 'unable to create user' });
	}
};
