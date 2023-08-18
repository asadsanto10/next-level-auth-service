/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
import { User } from '../users/user.model';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';
import { facultySearchableFields } from './faculty.variable';

const getAllFaculties = async (
	filters: IFacultyFilters,
	pageOptions: IPageOtions
): Promise<IGenericResponse<IFaculty[]>> => {
	const { searchTerm, ...filterData } = filters;

	const andCondition = [];

	if (searchTerm) {
		andCondition.push({
			$or: facultySearchableFields.map((field) => ({
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

	const result = await Faculty.find(checkCondition)
		.populate('academicDepartment')
		.populate('academicFaculty')
		.sort(sortCondition)
		.skip(skip)
		.limit(limit);

	const total = await Faculty.countDocuments(checkCondition);

	return {
		data: result,
		meta: {
			page,
			limit,
			total,
		},
	};
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
	const result = await Faculty.findOne({ id })
		.populate('academicDepartment')
		.populate('academicFaculty');
	return result;
};

const updateFaculty = async (id: string, payload: Partial<IFaculty>): Promise<IFaculty | null> => {
	const isExist = await Faculty.findOne({ id });

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
	}

	const { name, ...FacultyData } = payload;
	const updatedFacultyData: Partial<IFaculty> = { ...FacultyData };

	if (name && Object.keys(name).length > 0) {
		Object.keys(name).forEach((key) => {
			const nameKey = `name.${key}` as keyof Partial<IFaculty>;
			(updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
		});
	}

	const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
		new: true,
	});
	return result;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
	// check if the faculty is exist
	const isExist = await Faculty.findOne({ id });

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
	}

	const session = await mongoose.startSession();

	try {
		session.startTransaction();
		// delete faculty first
		const faculty = await Faculty.findOneAndDelete({ id }, { session });
		if (!faculty) {
			throw new ApiError(404, 'Failed to delete student');
		}
		// delete user
		await User.deleteOne({ id });
		session.commitTransaction();
		session.endSession();

		return faculty;
	} catch (error) {
		session.abortTransaction();
		throw error;
	}
};

export const facultyService = { getAllFaculties, getSingleFaculty, updateFaculty, deleteFaculty };
