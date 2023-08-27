/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
import { User } from '../users/user.model';
import { IAdmin, IAdminFilters } from './admin.interface';
import { Admin } from './admin.model';
import { adminSearchableFields } from './admin.variable';

const getAllAdmins = async (
	filters: IAdminFilters,
	pageOptions: IPageOtions
): Promise<IGenericResponse<IAdmin[]>> => {
	const { searchTerm, ...filtersData } = filters;

	const andConditions = [];

	if (searchTerm) {
		andConditions.push({
			$or: adminSearchableFields.map((field) => ({
				[field]: {
					$regex: searchTerm,
					$options: 'i',
				},
			})),
		});
	}

	if (Object.keys(filtersData).length) {
		andConditions.push({
			$and: Object.entries(filtersData).map(([field, value]) => ({
				[field]: value,
			})),
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
	const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

	const result = await Admin.find(whereConditions)
		.populate('managementDepartment')
		.sort(sortCondition)
		.skip(skip)
		.limit(limit);

	const total = await Admin.countDocuments(whereConditions);

	return {
		meta: {
			page,
			limit,
			total,
		},
		data: result,
	};
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
	const result = await Admin.findOne({ id }).populate('managementDepartment');

	return result;
};

const updateAdmin = async (id: string, payload: Partial<IAdmin>): Promise<IAdmin | null> => {
	const isExist = await Admin.findOne({ id });

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
	}

	const { name, ...adminData } = payload;

	const updatedStudentData: Partial<IAdmin> = { ...adminData };

	if (name && Object.keys(name).length > 0) {
		Object.keys(name).forEach((key) => {
			const nameKey = `name.${key}` as keyof Partial<IAdmin>;
			(updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
		});
	}

	const result = await Admin.findOneAndUpdate({ id }, updatedStudentData, {
		new: true,
	});
	return result;
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
	// check if the faculty is exist
	const isExist = await Admin.findOne({ id });

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
	}

	const session = await mongoose.startSession();

	try {
		session.startTransaction();
		// delete student first
		const student = await Admin.findOneAndDelete({ id }, { session });
		if (!student) {
			throw new ApiError(404, 'Failed to delete student');
		}
		// delete user
		await User.deleteOne({ id });
		await session.commitTransaction();
		await session.endSession();

		return student;
	} catch (error) {
		session.abortTransaction();
		await session.endSession();
		throw error;
	}
};

export const adminService = { getAllAdmins, getSingleAdmin, updateAdmin, deleteAdmin };
