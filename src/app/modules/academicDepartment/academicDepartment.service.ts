import { SortOrder } from 'mongoose';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
import { IAcademicDepartment, IAcademicDepartmentFilters } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
import { academicDepertmentSearchField } from './academicDepartment.variable';

const createDepartment = async (data: IAcademicDepartment): Promise<IAcademicDepartment> => {
	const result = await AcademicDepartment.create(data);
	return result;
};

const getAllDepertment = async (
	filters: IAcademicDepartmentFilters,
	pageOptions: IPageOtions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
	const { searchTerm, ...filterData } = filters;

	const andCondition = [];

	if (searchTerm) {
		andCondition.push({
			$or: academicDepertmentSearchField.map((field) => ({
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

	const result = await AcademicDepartment.find(checkCondition)
		.populate('academicFaculty')
		.sort(sortCondition)
		.skip(skip)
		.limit(limit);

	const total = await AcademicDepartment.countDocuments(checkCondition);

	return {
		data: result,
		meta: {
			page,
			limit,
			total,
		},
	};
};

const getDepertment = async (id: string): Promise<IAcademicDepartment | null> => {
	const result = await AcademicDepartment.findById(id).populate('academicFaculty');
	return result;
};

const updateDepertment = async (
	id: string,
	updatedData: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
	const result = await AcademicDepartment.findOneAndUpdate({ _id: id }, updatedData, {
		new: true,
	}).populate('academicFaculty');

	return result;
};

const deleteDepertment = async (id: string): Promise<IAcademicDepartment | null> => {
	const result = await AcademicDepartment.findByIdAndDelete(id);

	return result;
};

export const academicDepartmentService = {
	createDepartment,
	getAllDepertment,
	getDepertment,
	updateDepertment,
	deleteDepertment,
};
