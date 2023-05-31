import { createAsyncThunk } from '@reduxjs/toolkit';

import { RelationService } from '@/services/relation.service';

import { IOtherUser } from '@/types/relation.types';

export const getFriends = createAsyncThunk<IOtherUser[], void>(
	'getFriends',
	async (_, thunkAPI) => {
		try {
			const friends = await RelationService.getFriends();
			return friends;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const getSubscribers = createAsyncThunk<IOtherUser[], void>(
	'getSubscribers',
	async (_, thunkAPI) => {
		try {
			const subscribers = await RelationService.getSubscribers();
			return subscribers;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const getSubscriptions = createAsyncThunk<IOtherUser[], void>(
	'getSubscriptions',
	async (_, thunkAPI) => {
		try {
			const subscriptions = await RelationService.getSubscriptions();
			return subscriptions;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
