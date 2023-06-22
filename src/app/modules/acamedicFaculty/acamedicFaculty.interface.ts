import { Model } from 'mongoose';

export type IAcademicFaculty = {
	title: string;
};

export type AcademicFacultyModel = Model<IAcademicFaculty, Record<string, unknown>>;

// export type IAcademicFacultyFilters = {
// 	searchTerm?: string;
// };

export interface IAcademicFacultyFilter {
	searchTerm?: string;
	title?: string;
}
