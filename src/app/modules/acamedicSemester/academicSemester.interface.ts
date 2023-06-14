import { Model } from 'mongoose';

export type IAcademicSemesterMonth =
	| 'January'
	| 'February'
	| 'March'
	| 'April'
	| 'May'
	| 'June'
	| 'July'
	| 'August'
	| 'September'
	| 'October'
	| 'November'
	| 'December';

export type IAcademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall';
export type IAcademicSemesterCode = '01' | '02' | '03';

export type IAcademicSemester = {
	title: IAcademicSemesterTitle;
	year: number;
	code: '01' | '02' | '03';
	startMonth: IAcademicSemesterMonth;
	endMonth: IAcademicSemesterMonth;
};

export type AcademicSemesterModel = Model<IAcademicSemester, Record<string, unknown>>;

export interface IPageOtions {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}
export interface IGenericResponse<T> {
	data: T;
	meta: {
		page: number;
		limit: number;
		total: number;
	};
}