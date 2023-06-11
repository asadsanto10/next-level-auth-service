import { Schema, model } from 'mongoose';
import { AcademicSemesterModel, IAcademicSemester } from './academicSemester.interface';
import {
	academicSemesterCode,
	academicSemesterMonths,
	academicSemesterTitle,
} from './academicSemester.variable';

const academicSemesterSchema = new Schema<IAcademicSemester>(
	{
		title: { type: 'string', required: true, enum: academicSemesterTitle },
		year: { type: 'number', required: true },
		code: { type: 'string', required: true, enum: academicSemesterCode },
		startMonth: { type: 'string', required: true, enum: academicSemesterMonths },
		endMonth: { type: 'string', required: true, enum: academicSemesterMonths },
	},
	{ timestamps: true }
);

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
	'AcademicSemester',
	academicSemesterSchema
);
