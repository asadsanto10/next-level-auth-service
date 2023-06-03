import { Request, Response } from 'express';
import { Iuser } from '../../interface/userInterface/user.interface';
import User from '../../models/userModel/user.model';
import { getAdminUsersDB, getUserByIdDB } from '../../services/userService/user.service';

export const createUser = async (req: Request, res: Response) => {
	try {
		const data = req.body as Iuser;

		const user = new User(data);
		await user.save();

		res.status(200).json({ data: user });
	} catch (error) {
		console.log(error);
		res.json(error);
	}
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const userData = await getUserByIdDB(id);

		res.status(200).json({ data: userData });
	} catch (error) {
		console.log(error);
		res.json(error);
	}
};
export const getAllAdmin = async (req: Request, res: Response) => {
	try {
		const userData = await getAdminUsersDB();
		res.status(200).json({ data: userData });
	} catch (error) {
		console.log(error);
		res.json(error);
	}
};
