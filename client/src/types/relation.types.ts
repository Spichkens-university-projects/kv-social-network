import { AsyncThunk } from '@reduxjs/toolkit';

import { IUser } from '@/types/users.types';

export interface IOtherUser extends Pick<IUser, '_id' | 'name' | 'surname' | 'username' | 'avatar'> {
	relationStatus: RelationStatus | null;
}

export enum RelationStatus {
	FRIEND,
	SUBSCRIBER,
	SUBSCRIPTION
}

export interface RelationListType {
	title: string;
	list: IOtherUser[];
}

export interface RelationSelectorItemType extends RelationListType {
	getData: AsyncThunk<IOtherUser[], void, any>;
}
