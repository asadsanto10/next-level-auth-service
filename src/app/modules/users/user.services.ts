/* eslint-disable no-param-reassign */
import variable from '../../../config';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.uitls';

const createUser = async (userData: IUser): Promise<IUser | null> => {
	// auto generated user id
	const currentId = await generateUserId();
	userData.id = currentId;

	if (!userData.password) {
		userData.password = variable.defaultStudentPassword as string;
	}
	const user = await User.create(userData);
	if (!user) {
		throw new Error('Failed to create user');
	}
	return user;
};

export const userService = { createUser };
