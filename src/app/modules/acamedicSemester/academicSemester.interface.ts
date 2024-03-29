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
	year: string;
	code: '01' | '02' | '03';
	startMonth: IAcademicSemesterMonth;
	endMonth: IAcademicSemesterMonth;
};

export type AcademicSemesterModel = Model<IAcademicSemester, Record<string, unknown>>;

export interface IAcademicSemesterFilter {
	searchTerm?: string;
	title?: string;
	code?: string;
	year?: number;
	startMonth?: string;
	endMonth?: string;
}
