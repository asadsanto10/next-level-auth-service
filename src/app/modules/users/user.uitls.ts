import { IAcademicSemester } from '../acamedicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
	const lastUserId = await User.findOne({}, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
	return lastUserId?.id;
};

export const generateStudentId = async (
	academicSemester: IAcademicSemester
): Promise<string | null> => {
	const currentId = (await findLastStudentId()) || (0).toString().padStart(5, '0');

	let incrementId = (Number(currentId) + 1).toString().padStart(5, '0');

	incrementId = `${academicSemester.year.substring(2)}${academicSemester.code}${incrementId}`;

	return incrementId;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
	const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
		.sort({ createdAt: -1 })
		.lean();
	return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string | null> => {
	const currentId = (await findLastFacultyId()) || (0).toString().padStart(5, '0');

	let incrementedId = (Number(currentId) + 1).toString().padStart(5, '0');
	incrementedId = `F-${incrementedId}`;

	return incrementedId;
};

export const findLastUserId = async (): Promise<string | undefined> => {
	const lastUserId = await User.findOne({}, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
	return lastUserId?.id;
};

export const generateUserId = async (): Promise<string> => {
	const currentId = (await findLastUserId()) || 0;

	return (Number(currentId) + 1).toString().padStart(5, '0');
};
