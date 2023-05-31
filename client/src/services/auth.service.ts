import { axiosClassic } from '@/axios/axios';

import { IAuthResponse, LoginInputs, RegisterInputs } from '@/types/auth.types';

export const AuthService = {
	async signIn({ email, password }: LoginInputs) {
		const response = await axiosClassic.post<IAuthResponse>('/auth/login', {
			email,
			password
		});
		return response.data;
	},

	async signUp({ email, password, name, surname, username }: RegisterInputs) {
		const response = await axiosClassic.post<IAuthResponse>('/auth/register', {
			email,
			password,
			name,
			surname,
			username
		});
		return response.data;
	},

	async refresh() {
		const response = await axiosClassic.get<IAuthResponse>('/auth/refresh', {
			withCredentials: true
		});
		return response.data;
	}
};
