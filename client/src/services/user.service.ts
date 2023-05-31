import { axiosClassic, axiosWithToken } from '@/axios/axios';

import { IOtherUser } from '@/types/relation.types';
import { GetAllUsersRequestOptions, IUser } from '@/types/users.types';

export const UserService = {
	async getAllUsers(options: GetAllUsersRequestOptions) {
		const response = await axiosWithToken.get<IOtherUser[]>('/users', {
			params: { ...options }
		});
		return response.data;
	},

	async getUserById(id: string) {
		const response = await axiosClassic.get<IUser>(`/users/by-id/${id}`);
		return response.data;
	},

	async getUserByUsername(username: string) {
		const response = await axiosClassic.get<IUser>(`/users/by-username/${username}`);
		return response.data;
	},

	async updateUser(user: Partial<IUser>) {
		const response = await axiosWithToken.patch<IUser>('/users/update', user);
		return response.data;
	},

	async addNewPhoto(photo: string) {
		const response = await axiosWithToken.patch<IUser>('/users/add-photo', { photo });
		return response.data;
	}
};
