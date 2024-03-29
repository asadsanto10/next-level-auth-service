import { IAcademicSemester } from '../acamedicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
	const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
		.sort({ createdAt: -1 })
		.lean();
	return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
	academicSemester: IAcademicSemester | null
): Promise<string | null> => {
	const currentId = (await findLastStudentId()) || (0).toString().padStart(5, '0');

	let incrementId = (Number(currentId) + 1).toString().padStart(5, '0');
	incrementId = `${academicSemester?.year.substring(2)}${academicSemester?.code}${incrementId}`;

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

export const findLastAdminId = async (): Promise<string | undefined> => {
	const lastFaculty = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
		.sort({
			createdAt: -1,
		})
		.lean();

	return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
	const currentId = (await findLastAdminId()) || (0).toString().padStart(5, '0');
	let incrementedId = (Number(currentId) + 1).toString().padStart(5, '0');
	incrementedId = `A-${incrementedId}`;

	return incrementedId;
};
