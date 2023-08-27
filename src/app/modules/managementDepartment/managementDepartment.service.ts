import { SortOrder } from 'mongoose';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
// prettier-ignore
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';
import { managementDepartmentSearchableFields } from './managementDepartment.variable';

const createDepartment = async (
	payload: IManagementDepartment
): Promise<IManagementDepartment | null> => {
	const result = await ManagementDepartment.create(payload);
	return result;
};

const getAllDepartments = async (
	filters: IManagementDepartmentFilters,
	pageOptions: IPageOtions
): Promise<IGenericResponse<IManagementDepartment[]>> => {
	const { searchTerm, ...filtersData } = filters;

	const andConditions = [];

	if (searchTerm) {
		andConditions.push({
			$or: managementDepartmentSearchableFields.map((field) => ({
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

	const sortConditions: { [key: string]: SortOrder } = {};
	const { sortBy, sortOrder } = options;

	if (sortBy && sortOrder) {
		sortConditions[sortBy] = sortOrder;
	}
	const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

	const result = await ManagementDepartment.find(whereConditions)
		.sort(sortConditions)
		.skip(skip)
		.limit(limit);

	const total = await ManagementDepartment.countDocuments();

	return {
		data: result,
		meta: {
			page,
			limit,
			total,
		},
	};
};

const getSingleDepartment = async (id: string): Promise<IManagementDepartment | null> => {
	const result = await ManagementDepartment.findById(id);
	return result;
};

const updateDepartment = async (
	id: string,
	payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
	const result = await ManagementDepartment.findOneAndUpdate({ _id: id }, payload, {
		new: true,
	});
	return result;
};

const deleteDepartment = async (id: string): Promise<IManagementDepartment | null> => {
	const result = await ManagementDepartment.findByIdAndDelete(id);
	return result;
};

export const managementDepartmentService = {
	createDepartment,
	getAllDepartments,
	getSingleDepartment,
	updateDepartment,
	deleteDepartment,
};
