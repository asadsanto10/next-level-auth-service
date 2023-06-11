import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/apiError';
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

// ?? handleing same year and same semester issue
// eslint-disable-next-line func-names
academicSemesterSchema.pre('save', async function (next) {
	const isExist = await this.$model('AcademicSemester').findOne({
		title: this.title,
		year: this.year,
	});
	if (isExist) {
		throw new ApiError(httpStatus.CONFLICT, 'Academic semester is already exists!');
	}
	next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
	'AcademicSemester',
	academicSemesterSchema
);
