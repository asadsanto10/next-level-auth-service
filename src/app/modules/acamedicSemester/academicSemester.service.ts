import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { academicSemesterTitleCodeMapper } from './academicSemester.variable';

const createAcademicSemester = async (data: IAcademicSemester): Promise<IAcademicSemester> => {
	if (academicSemesterTitleCodeMapper[data.title] !== data.code) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
	}
	const result = await AcademicSemester.create(data);
	return result;
};

export const academicSemesterService = { createAcademicSemester };
