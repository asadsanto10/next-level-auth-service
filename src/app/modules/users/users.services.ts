/* eslint-disable no-param-reassign */
import variable from '../../../config';
import { generateUserId } from './user.uitls';
import { IUser } from './users.interface';
import { User } from './users.model';

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

export default {
	createUser,
};
