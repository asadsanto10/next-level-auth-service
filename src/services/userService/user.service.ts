import { Iuser } from '../../interface/userInterface/user.interface';
import User from '../../models/userModel/user.model';

export const getUserByIdDB = async (id: string): Promise<Iuser | null> => {
	const user = await User.findOne({ id }, { name: 1 });
	return user;
};

export const getAdminUsersDB = async (): Promise<Iuser> => {
	const admins = await User.getAdminUsers();
	return admins;
};
