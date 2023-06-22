import { Schema, model } from 'mongoose';
import { AcademicFacultyModel, IAcademicFaculty } from './acamedicFaculty.interface';

const academicSemesterSchema = new Schema<IAcademicFaculty>(
	{
		title: { type: 'string', required: true, unique: true },
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
	}
);

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
	'AcademicFaculty',
	academicSemesterSchema
);
