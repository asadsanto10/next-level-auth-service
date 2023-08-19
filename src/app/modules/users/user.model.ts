/* eslint-disable func-names */
import bcrypt from 'bcrypt';
import mongoose, { Schema, model } from 'mongoose';
import variable from '../../../config';
import { IUser, UserModel } from './user.interface';

const UserSchema = new Schema<IUser, UserModel>(
	{
		id: { type: 'string', required: true, unique: true },
		password: { type: 'string', required: true, select: false },
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
		needsPasswordChange: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true, virtuals: true }
);

UserSchema.pre('save', async function (next) {
	// hashing user password

	this.password = await bcrypt.hash(this.password, Number(variable.bycryptSaltRounds));
	next();
});

UserSchema.statics.isUserExist = async function (
	id: string
): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'> | null> {
	const user = mongoose
		.model('Users')
		.findOne({ id }, { id: 1, password: 1, role: 1, needsPasswordChange: 1 });

	return user;
};

UserSchema.statics.isPasswordMatched = async function (
	givenPassword: string,
	savedPassword: string
): Promise<boolean> {
	return bcrypt.compare(givenPassword, savedPassword);
};

export const User = model<IUser, UserModel>('Users', UserSchema);
