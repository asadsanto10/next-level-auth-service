/* eslint-disable func-names */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const UserSchema = new Schema<IUser>(
	{
		id: { type: 'string', required: true, unique: true },
		password: { type: 'string', required: true },
		role: { type: 'string', required: true },
		student: {
			type: Schema.Types.ObjectId,
			ref: 'Student',
		},
		faculty: {
			type: Schema.Types.ObjectId,
			ref: 'Faculty',
		},
		admin: {
			type: Schema.Types.ObjectId,
			ref: 'Admin',
		},
	},
	{ timestamps: true, virtuals: true }
);

export const User = model<IUser, UserModel>('Users', UserSchema);
