import { FRIENDS_LIST_COUNT_LIMIT } from '@/utils/constants/lists.constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RelationHelper } from '@/store/relations/relation.helper';
import { getFriends, getSubscribers, getSubscriptions } from '@/store/relations/relations.actions';

import { IOtherUser, RelationListType, RelationStatus } from '@/types/relation.types';

export interface RelationsStoreInitialState {
	moreOnServer: boolean;
	friends: IOtherUser[];
	subscribers: IOtherUser[];
	subscriptions: IOtherUser[];
	listToRender: RelationListType;
	isLoading: boolean;
}

const initialState: RelationsStoreInitialState = {
	moreOnServer: true,
	friends: [],
	subscribers: [],
	subscriptions: [],
	listToRender: { title: '', list: [] },
	isLoading: false
};

export const relationsSlice = createSlice({
	name: 'relations',
	initialState,
	reducers: {
		setListToRender: (state, { payload }: PayloadAction<RelationListType>) => {
			state.listToRender = payload;
			state.moreOnServer = payload.list && payload.list.length === FRIENDS_LIST_COUNT_LIMIT;
		},
		removeFriend: (state, { payload }: PayloadAction<IOtherUser>) => {
			state.friends = RelationHelper.filterState(state.friends, payload._id);
		},
		acceptFriendRequest: (state, { payload }: PayloadAction<IOtherUser>) => {
			state.subscribers = RelationHelper.filterState(state.subscribers, payload._id);
		},
		rejectFriendRequest: (state, { payload }: PayloadAction<IOtherUser>) => {
			state.subscribers = RelationHelper.filterState(state.subscribers, payload._id);
		},
		cancelFriendRequest: (state, { payload }: PayloadAction<IOtherUser>) => {
			const filteredList = RelationHelper.filterState(state.subscriptions, payload._id);
			state.subscriptions = filteredList;
			state.listToRender = { ...state.listToRender, list: filteredList };
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getFriends.pending, state => {
				state.isLoading = true;
			})
			.addCase(getFriends.rejected, state => {
				state.isLoading = false;
				state.friends = [];
			})
			.addCase(getFriends.fulfilled, (state: RelationsStoreInitialState, { payload }) => {
				state.isLoading = false;
				state.friends = payload.map(friend => {
					return { ...friend, relationStatus: RelationStatus.FRIEND };
				});
				state.listToRender = { list: state.friends, title: 'Друзья' };
				state.moreOnServer = payload.length === FRIENDS_LIST_COUNT_LIMIT;
			})
			.addCase(getSubscribers.pending, state => {
				state.isLoading = true;
			})
			.addCase(getSubscribers.rejected, state => {
				state.isLoading = false;
				state.subscribers = [];
			})
			.addCase(getSubscribers.fulfilled, (state: RelationsStoreInitialState, { payload }) => {
				state.isLoading = false;
				state.subscribers = payload.map(subscriber => {
					return { ...subscriber, relationStatus: RelationStatus.SUBSCRIBER };
				});
				state.listToRender = { list: state.subscribers, title: 'Подписчики' };
				state.moreOnServer = payload.length === FRIENDS_LIST_COUNT_LIMIT;
			})
			.addCase(getSubscriptions.pending, state => {
				state.isLoading = true;
			})
			.addCase(getSubscriptions.rejected, state => {
				state.isLoading = false;
				state.subscriptions = [];
			})
			.addCase(getSubscriptions.fulfilled, (state: RelationsStoreInitialState, { payload }) => {
				state.isLoading = false;
				state.subscriptions = payload.map(subscription => {
					return { ...subscription, relationStatus: RelationStatus.SUBSCRIPTION };
				});
				state.listToRender = { list: state.subscriptions, title: 'Подписки' };
				state.moreOnServer = payload.length === FRIENDS_LIST_COUNT_LIMIT;
			});
	}
});

export const {
	rejectFriendRequest,
	acceptFriendRequest,
	cancelFriendRequest,
	removeFriend,
	setListToRender
} = relationsSlice.actions;
