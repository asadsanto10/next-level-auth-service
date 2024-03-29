import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IStudent } from '../student/student.interface';

export interface IUser {
	id: string;
	role: string;
	password: string;
	student?: Types.ObjectId | IStudent;
	faculty?: Types.ObjectId | IFaculty;
	admin?: Types.ObjectId | IAdmin;
	needsPasswordChange: true | false;
	passwordChangedAt?: Date;
}

// export type IUserMethods = {
// 	isUserExist(id: string): Promise<Partial<IUser>>;
// 	isPasswordMatch(givenPassword: string, savedPassword: string): Promise<boolean>;
// };

export type UserModel = {
	isUserExist(id: string): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
	isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
