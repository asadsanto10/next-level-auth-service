/* eslint-disable no-param-reassign */
import variable from '../../../config';
import { AcademicSemester } from '../acamedicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.uitls';

const createStudent = async (student: IStudent, userData: IUser): Promise<IUser | null> => {
	// auto generated student id
	// const currentId = await generateStudentId();
	// userData.id = currentId as string;

	// set default student password if not provided
	if (!userData.password) {
		userData.password = variable.defaultStudentPassword as string;
	}
	// set role
	userData.role = 'student';

	const academicSemester = await AcademicSemester.findById(student.academicSemester);

	// generate student id
	const studentId = await generateStudentId(academicSemester);

	const user = await User.create(userData);

	if (!user) {
		throw new Error('Failed to create user');
	}
	return user;
};

export const userService = { createStudent };
