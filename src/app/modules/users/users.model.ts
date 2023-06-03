import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './users.interface';

const userSchema = new Schema<IUser>(
	{
		id: { type: 'string', required: true, unique: true },
		password: { type: 'string', required: true },
		role: { type: 'string', required: true },
	},
	{ timestamps: true }
);

export const User = model<IUser, UserModel>('Users', userSchema);
