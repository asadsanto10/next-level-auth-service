import {
	IAcademicSemesterCode,
	IAcademicSemesterMonth,
	IAcademicSemesterTitle,
} from './academicSemester.interface';

export const academicSemesterMonths: IAcademicSemesterMonth[] = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const academicSemesterTitle: IAcademicSemesterTitle[] = ['Autumn', 'Summer', 'Fall'];
export const academicSemesterCode: IAcademicSemesterCode[] = ['01', '02', '03'];

export const academicSemesterTitleCodeMapper: {
	[key: string]: string;
} = {
	Autumn: '01',
	Summer: '02',
	Fall: '03',
};

export const paginationFiled = ['page', 'limit', 'sortBy', 'sortOrder'];
export const academicSemesterFilterField = [
	'searchTerm',
	'title',
	'code',
	'year',
	'startMonth',
	'endMonth',
];
export const academicSemesterSearchField = ['title', 'code', 'startMonth', 'endMonth'];
