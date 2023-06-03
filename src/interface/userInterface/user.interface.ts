import { HydratedDocument, Model } from 'mongoose';

export interface Iuser {
	id: string;
	role: 'student';
	password: string;
	name: {
		firstaName: string;
		lastName: string;
	};
	dob?: number;
	gender: 'male' | 'female';
	email?: string;
	contactNo: string;
	emergencyContact: string;
	address: string;
}

// for both methods and static
export interface IGetAdminMethods extends Model<Iuser> {
	adminUsers(): number;
}

export interface UserModel extends Model<Iuser, {}, IGetAdminMethods> {
	getAdminUsers(): Promise<HydratedDocument<Iuser, IGetAdminMethods>>;
}
