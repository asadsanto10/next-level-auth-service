/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
import { User } from '../users/user.model';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';
import { studentSearchableFields } from './student.variable';

const getAllStudents = async (
	filters: IStudentFilters,
	pageOptions: IPageOtions
): Promise<IGenericResponse<IStudent[]>> => {
	const { searchTerm, ...filterData } = filters;

	const andCondition = [];

	if (searchTerm) {
		andCondition.push({
			$or: studentSearchableFields.map((field) => ({
				[field]: {
					$regex: searchTerm,
					$options: 'i',
				},
			})),
		});
	}

	if (Object.keys(filterData).length > 0) {
		andCondition.push({
			$and: Object.entries(filterData).map(([field, value]) => ({ [field]: value })),
		});
	}

	const options = calculatePagination(pageOptions);
	const page = options.page as number;
	const limit = options.limit as number;
	const skip = options.skip as number;

	const sortCondition: { [key: string]: SortOrder } = {};
	const { sortBy, sortOrder } = options;

	if (sortBy && sortOrder) {
		sortCondition[sortBy] = sortOrder;
	}

	const checkCondition = andCondition.length > 0 ? { $and: andCondition } : {};

	const result = await Student.find(checkCondition)
		.populate('academicSemester')
		.populate('academicDepartment')
		.populate('academicFaculty')
		.sort(sortCondition)
		.skip(skip)
		.limit(limit);

	const total = await Student.countDocuments(checkCondition);

	return {
		data: result,
		meta: {
			page,
			limit,
			total,
		},
	};
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
	const result = await Student.findOne({ id })
		.populate('academicSemester')
		.populate('academicDepartment')
		.populate('academicFaculty');
	return result;
};

const updateStudent = async (
	id: string,
	updatedData: Partial<IStudent>
): Promise<IStudent | null> => {
	const isExist = Student.findOne({ id });

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
	}

	const { name, guardian, localGuardian, ...studentData } = updatedData;

	const updatedStudentData: Partial<IStudent> = { ...studentData };

	const getUpdayeKeyAndValue = (filed: any, fieldName: string): void => {
		Object.keys(filed).forEach((key) => {
			const nameKey = `${fieldName}.${key}`;
			const value = filed[key as keyof typeof filed];
			(updatedStudentData as any)[nameKey] = value;
		});
	};

	if (name && Object.keys(name).length > 0) {
		getUpdayeKeyAndValue(name, 'name');
	}

	if (guardian && Object.keys(guardian).length > 0) {
		getUpdayeKeyAndValue(guardian, 'guardian');
	}

	if (localGuardian && Object.keys(localGuardian).length > 0) {
		getUpdayeKeyAndValue(localGuardian, 'localGuardian');
	}

	const result = await Student.findOneAndUpdate({ id }, updatedStudentData, { new: true });

	return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
	// check if the faculty is exist
	const isExist = await Student.findOne({ id });

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'student not found !');
	}

	const session = await mongoose.startSession();

	try {
		session.startTransaction();
		// delete student first
		const student = await Student.findOneAndDelete({ id }, { session });
		if (!student) {
			throw new ApiError(404, 'Failed to delete student');
		}
		// delete user
		await User.deleteOne({ id });
		session.commitTransaction();
		session.endSession();

		return student;
	} catch (error) {
		session.abortTransaction();
		throw error;
	}
};

export const studentService = { getAllStudents, getSingleStudent, updateStudent, deleteStudent };
