import { Schema, model } from 'mongoose';
import { IGetAdminMethods, Iuser, UserModel } from '../../interface/userInterface/user.interface';

const userSchema = new Schema<Iuser, IGetAdminMethods>({
	id: { type: String, required: true, unique: true },
	role: { type: String, required: true },
	password: { type: String },
	name: {
		firstaName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
	},
	dob: {
		type: Number,
	},
	gender: {
		type: String,
		enum: ['male', 'female'],
		required: true,
	},
	email: {
		type: String,
	},
	contactNo: { type: String, required: true },
	emergencyContact: { type: String, required: true },
	address: { type: String, required: true },
});
// for static methods
userSchema.static('getAdminUsers', async function getAdminUsers() {
	const adminUser = await this.find({ role: 'Admin' });
	return adminUser;
});

// for methods
// userSchema.method('fullName', function getAdminUsers() {});

const User = model<Iuser, UserModel>('User', userSchema);

export default User;
