import { IOtherUser } from '@/types/relation.types';
import { IUser } from '@/types/users.types';

export const concatName = (user: IUser | IOtherUser) => {
	return `${user.name} ${user.surname}`;
};

export const concatNameWithShortSurname = (user: IUser) => {
	user.surname = user.surname.slice(0, 1).concat('.');
	return concatName(user);
};
