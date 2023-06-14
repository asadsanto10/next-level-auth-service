import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import calculatePagination from '../../../helpers/pagination.helper';
import { IAcademicSemester, IGenericResponse, IPageOtions } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { academicSemesterTitleCodeMapper } from './academicSemester.variable';

const createAcademicSemester = async (data: IAcademicSemester): Promise<IAcademicSemester> => {
	if (academicSemesterTitleCodeMapper[data.title] !== data.code) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
	}
	const result = await AcademicSemester.create(data);
	return result;
};

const getAllSemester = async (
	pageOptions: IPageOtions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
	const options = calculatePagination(pageOptions);
	const page = options.page as number;
	const limit = options.limit as number;
	const skip = options.skip as number;

	const sortCondition: { [key: string]: SortOrder } = {};
	const { sortBy, sortOrder } = options;

	if (sortBy && sortOrder) {
		sortCondition[sortBy] = sortOrder;
	}

	const result = await AcademicSemester.find().sort(sortCondition).skip(skip).limit(limit);

	const total = await AcademicSemester.countDocuments();

	return {
		data: result,
		meta: {
			page,
			limit,
			total,
		},
	};
};

export const academicSemesterService = { createAcademicSemester, getAllSemester };
