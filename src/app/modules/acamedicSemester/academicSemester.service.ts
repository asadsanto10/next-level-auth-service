import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import calculatePagination from '../../../helpers/pagination.helper';

import { IPageOtions } from '../../../interface/pagination';
import {
	IAcademicSemester,
	IAcademicSemesterFilter,
	IGenericResponse,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import {
	academicSemesterSearchField,
	academicSemesterTitleCodeMapper,
} from './academicSemester.variable';

const createAcademicSemester = async (data: IAcademicSemester): Promise<IAcademicSemester> => {
	if (academicSemesterTitleCodeMapper[data.title] !== data.code) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
	}
	const result = await AcademicSemester.create(data);
	return result;
};

const getAllSemester = async (
	filters: IAcademicSemesterFilter,
	pageOptions: IPageOtions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
	const { searchTerm, ...filterData } = filters;

	// const andCondition = [
	// 	{
	// 		$or: [
	// 			{
	// 				title: {
	// 					$regex: searchTerm,
	// 					$options: 'i',
	// 				},
	// 			},
	// 		],
	// 	},
	// ];

	const andCondition = [];

	if (searchTerm) {
		andCondition.push({
			$or: academicSemesterSearchField.map((field) => ({
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

	const result = await AcademicSemester.find(checkCondition)
		.sort(sortCondition)
		.skip(skip)
		.limit(limit);

	const total = await AcademicSemester.countDocuments(checkCondition);

	return {
		data: result,
		meta: {
			page,
			limit,
			total,
		},
	};
};

const getSemesterById = async (id: string): Promise<IAcademicSemester | null> => {
	const result = await AcademicSemester.findById(id);
	return result;
};

export const academicSemesterService = { createAcademicSemester, getAllSemester, getSemesterById };
