import { Schema, model } from 'mongoose';
import { AcademicFacultyModel, IAcademicFaculty } from './acamedicFaculty.interface';

const AcademicSemesterSchema = new Schema<IAcademicFaculty>(
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
	AcademicSemesterSchema
);
