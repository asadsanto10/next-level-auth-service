import { SortOrder } from 'mongoose';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
import { IAcademicFaculty, IAcademicFacultyFilter } from './acamedicFaculty.interface';
import { AcademicFaculty } from './acamedicFaculty.model';
import { academicFacultySearchField } from './acamedicFaculty.variable';

const createFaculty = async (data: IAcademicFaculty): Promise<IAcademicFaculty> => {
	const result = await AcademicFaculty.create(data);
	return result;
};

const getAllFaculty = async (
	filters: IAcademicFacultyFilter,
	pageOptions: IPageOtions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
	const { searchTerm, ...filterData } = filters;

	const andCondition = [];

	if (searchTerm) {
		andCondition.push({
			$or: academicFacultySearchField.map((field) => ({
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

	const result = await AcademicFaculty.find(checkCondition)
		.sort(sortCondition)
		.skip(skip)
		.limit(limit);

	const total = await AcademicFaculty.countDocuments(checkCondition);

	return {
		data: result,
		meta: {
			page,
			limit,
			total,
		},
	};
};

const getFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
	const result = await AcademicFaculty.findById(id);
	return result;
};

const updateFaculty = async (
	id: string,
	updatedData: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
	const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, updatedData, { new: true });

	return result;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
	const result = await AcademicFaculty.findByIdAndDelete(id);

	return result;
};

export const academicFaculty = {
	createFaculty,
	getAllFaculty,
	getFaculty,
	updateFaculty,
	deleteFaculty,
};
