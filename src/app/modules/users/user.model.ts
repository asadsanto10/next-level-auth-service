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

// UserSchema.pre('save', async function (next) {
// 	// hashing user password
// 	this.password = await bcrypt.hash(this.password, Number(variable.bycryptSaltRounds));
// 	next();
// });

export const User = model<IUser, UserModel>('Users', UserSchema);
