export interface IUser {
	_id: string;
	email: string;
	name: string;
	surname: string;
	username: string;
	avatar: string;
	profileBackground: string;
	status: string;
	birthday: Date;
	gender: GENDER;
	friends: IUser[];
	subscribers: IUser[];
	subscriptions: IUser[];
	photos: string[];
	createdAt: Date;
	updatedAt: Date;
}

enum GENDER {
	MALE,
	FEMALE
}

export interface GetAllUsersRequestOptions {
	searchTerm?: string | undefined;
	exclude?: string | undefined;
	limit?: number;
	page?: number;
}
