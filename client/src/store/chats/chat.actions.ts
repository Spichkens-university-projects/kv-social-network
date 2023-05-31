import { createAsyncThunk } from '@reduxjs/toolkit';

import { ChatService } from '@/services/chat.service';

import { GetHistoryParams, IChat } from '@/types/chats.types';
import { IMessage } from '@/types/messages.types';

export const getChats = createAsyncThunk<IChat[], void>('/chats', async (arg, thunkAPI) => {
	try {
		const chats = await ChatService.getChats();
		return chats;
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e);
	}
});

export const getHistory = createAsyncThunk<IMessage[], GetHistoryParams>(
	'/chats/history',
	async (queryParams, thunkAPI) => {
		try {
			return await ChatService.getHistory(queryParams);
		} catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	}
);
