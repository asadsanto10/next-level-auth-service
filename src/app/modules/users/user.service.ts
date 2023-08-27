/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import variable from '../../../config';
import ApiError from '../../../errors/apiError';
import { AcademicSemester } from '../acamedicSemester/academicSemester.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.uitls';

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

const createFaculty = async (faculty: IFaculty, userData: IUser): Promise<IUser | null> => {
	// set default student password if not provided
	if (!userData.password) {
		userData.password = variable.defaultFacultyPassword as string;
	}
	// set role
	userData.role = 'faculty';

	let newUserAllData = null;

	// generate student id
	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		const facultyId = await generateFacultyId();
		userData.id = facultyId as string;
		faculty.id = facultyId as string;

		const newFaculty = await Faculty.create([faculty], { session });

		if (!newFaculty.length) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Faild to create faculty');
		}
		userData.faculty = newFaculty[0]._id;

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

const createAdmin = async (admin: IAdmin, user: IUser): Promise<IUser | null> => {
	// default password
	if (!user.password) {
		user.password = variable.defaultAdminPassword as string;
	}
	// set role
	user.role = 'admin';

	let newUserAllData = null;
	const session = await mongoose.startSession();
	try {
		session.startTransaction();
		// generate admin id
		const id = await generateAdminId();
		user.id = id;
		admin.id = id;

		const newAdmin = await Admin.create([admin], { session });

		if (!newAdmin.length) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
		}

		user.admin = newAdmin[0]._id;

		const newUser = await User.create([user], { session });

		if (!newUser.length) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
		}
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
			path: 'admin',
			populate: [
				{
					path: 'managementDepartment',
				},
			],
		});
	}

	return newUserAllData;
};

export const userService = { createStudent, createFaculty, createAdmin };
