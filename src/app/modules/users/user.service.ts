/* eslint-disable no-param-reassign */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import variable from '../../../config';
import ApiError from '../../../errors/apiError';
import { AcademicSemester } from '../acamedicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.uitls';

const createStudent = async (student: IStudent, userData: IUser): Promise<IUser | null> => {
	// set default student password if not provided
	if (!userData.password) {
		userData.password = variable.defaultStudentPassword as string;
	}
	// set role
	userData.role = 'student';

	const academicSemester = await AcademicSemester.findById(student.academicSemester);

	let newUserAllData = null;

	// generate student id
	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		const studentId = await generateStudentId(academicSemester);
		userData.id = studentId as string;
		student.id = studentId as string;

		const newStudent = await Student.create([student], { session });

		if (!newStudent.length) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Faild to create student');
		}
		userData.student = newStudent[0]._id;

		const newUser = await User.create([userData], { session });
		if (!newUser.length) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Faild to create user');
		}

		// eslint-disable-next-line prefer-destructuring
		newUserAllData = newUser[0];

		await session.commitTransaction();
		await session.endSession();
	} catch (error) {
		await session.abortTransaction();
		await session.endSession();
		throw error;
	}

	if (newUserAllData) {
		newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
			path: 'student',
			populate: [
				{
					path: 'academicSemester',
				},
				{
					path: 'academicDepartment',
				},
				{
					path: 'academicFaculty',
				},
			],
		});
	}
	return newUserAllData;
};

export const userService = { createStudent };
