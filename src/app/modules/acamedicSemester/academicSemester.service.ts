import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemester = async (data: IAcademicSemester): Promise<IAcademicSemester> => {
	const result = await AcademicSemester.create(data);
	return result;
};

export const academicSemesterService = { createAcademicSemester };
