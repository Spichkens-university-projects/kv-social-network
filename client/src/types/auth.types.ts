import { IUser } from '@/types/users.types';

export interface LoginInputs {
	email: string;
	password: string;
}

export interface RegisterInputs extends LoginInputs {
	name: string;
	surname: string;
	username: string;
}

export interface IAuthResponse {
	user: IUser;
	accessToken: string;
	refreshToken: string;
}
