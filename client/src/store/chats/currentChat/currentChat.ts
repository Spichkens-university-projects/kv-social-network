import { MESSAGES_LIST_COUNT_LIMIT } from '@/utils/constants/lists.constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getHistory } from '@/store/chats/chat.actions';

import { IChat } from '@/types/chats.types';
import { IMessage, UpdateReadStatusDto } from '@/types/messages.types';

export interface ChatStoreInitialState {
	currentChat: IChat | null;
	messages: IMessage[];
	moreOnServer: boolean;
	isLoading: boolean;
	newMessage: IMessage | null;
}

const initialState: ChatStoreInitialState = {
	currentChat: null,
	messages: [],
	moreOnServer: true,
	isLoading: false,
	newMessage: null
};

export const currentChatSlice = createSlice({
	name: 'currentChat',
	initialState,
	reducers: {
		resetNotificationState: state => {
			state.newMessage = null;
		},
		setCurrentChat: (state, { payload }: PayloadAction<IChat>) => {
			state.currentChat = payload;
		},
		resetCurrentChat: state => {
			state.currentChat = null;
			state.moreOnServer = true;
			state.messages = [];
		},
		addMessage: (state, { payload }: PayloadAction<IMessage>) => {
			state.messages.unshift({ ...payload, isRead: false });
			state.newMessage = payload;
		},
		makeMessageRead: (state, { payload }: PayloadAction<UpdateReadStatusDto>) => {
			const messageToRead = state.messages.find(message => message._id === payload.messageId);
			if (messageToRead) messageToRead.isRead = true;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getHistory.fulfilled, (state: ChatStoreInitialState, { payload }) => {
				state.messages = [...state.messages, ...payload];
				state.moreOnServer = payload.length === MESSAGES_LIST_COUNT_LIMIT;
				state.isLoading = false;
			})
			.addCase(getHistory.pending, (state: ChatStoreInitialState) => {
				state.isLoading = true;
			});
	}
});

export const { setCurrentChat, addMessage, makeMessageRead, resetCurrentChat, resetNotificationState } =
	currentChatSlice.actions;
