import { DIALOGS_LIST_COUNT_LIMIT } from '@/utils/constants/lists.constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getChats } from '@/store/chats/chat.actions';

import { AddMessageResponse, ChatType, IChat, IDialog, IGroupChat } from '@/types/chats.types';
import { IUser } from '@/types/users.types';

export interface ChatStoreInitialState {
	dialogs: IDialog[];
	groups: IGroupChat[];
	lastChats: IChat[];
	moreOnServer: boolean;
	isLoading: boolean;
}

const initialState: ChatStoreInitialState = {
	dialogs: [],
	groups: [],
	lastChats: [],
	moreOnServer: true,
	isLoading: false
};

export const chatSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		addTypingUser: (
			state,
			{ payload }: PayloadAction<{ typingUser: IUser; chatWhereTyping: IChat }>
		) => {
			const chats: (IDialog | IGroupChat)[] =
				payload.chatWhereTyping.type === ChatType.DIALOG ? state.dialogs : state.groups;
			const chatToUpdate = chats.find(chat => chat._id === payload.chatWhereTyping._id);
			if (!chatToUpdate?.typingUsers.find(user => user._id === payload.typingUser._id))
				chatToUpdate?.typingUsers.push(payload.typingUser);
		},
		removeTypingUser: (
			state,
			{ payload }: PayloadAction<{ typingUser: IUser; chatWhereTyping: IChat }>
		) => {
			const chats: (IDialog | IGroupChat)[] =
				payload.chatWhereTyping.type === ChatType.DIALOG ? state.dialogs : state.groups;
			const chatToUpdate = chats.find(chat => chat._id === payload.chatWhereTyping._id);
			if (chatToUpdate)
				chatToUpdate.typingUsers = chatToUpdate?.typingUsers.filter(
					user => user._id !== payload.typingUser._id
				);
		},
		addDialog: (state, { payload }: PayloadAction<IDialog>) => {
			state.dialogs.unshift({ ...payload, typingUsers: [] });
		},
		addGroup: (state, { payload }: PayloadAction<IGroupChat>) => {
			state.groups.unshift({ ...payload, typingUsers: [] });
		},
		updateLastMessage: (state, { payload }: PayloadAction<AddMessageResponse>) => {
			const chats: (IDialog | IGroupChat)[] =
				payload.type === ChatType.DIALOG ? state.dialogs : state.groups;
			const chatToUpdate = chats.find(chat => chat._id === payload.chatId);
			if (chatToUpdate) chatToUpdate.lastMessage = payload.message;
		},
		addDialogToLastDialogsSelector: (state, { payload }: PayloadAction<IChat>) => {
			const isExist = state.lastChats.find(chat => chat._id === payload._id);
			if (!isExist) state.lastChats.unshift(payload);
		},
		removeDialogFromLastDialogsSelector: (state, { payload }: PayloadAction<string>) => {
			state.lastChats = state.lastChats.filter(chat => chat._id !== payload);
		}
	},
	extraReducers: builder => {
		builder.addCase(getChats.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(getChats.rejected, state => {
			state.isLoading = false;
		});
		builder.addCase(getChats.fulfilled, (state, { payload }: PayloadAction<IChat[]>) => {
			const chatsDialogs: IDialog[] = payload.filter(chat => {
				if (chat.type === ChatType.DIALOG) {
					return chat;
				}
			}) as IDialog[];

			const chatsGroups: IGroupChat[] = payload.filter(chat => {
				if (chat.type === ChatType.GROUP) {
					return chat;
				}
			}) as IGroupChat[];

			state.dialogs = chatsDialogs.map(dialog => ({
				...dialog,
				typingUsers: [],
				lastMessage: dialog.messages[0]
			}));

			state.groups = chatsGroups.map(group => ({
				...group,
				typingUsers: [],
				lastMessage: group.messages[0]
			}));

			state.moreOnServer = payload.length === DIALOGS_LIST_COUNT_LIMIT;
			state.isLoading = false;
		});
	}
});

export const {
	updateLastMessage,
	addGroup,
	addDialog,
	addDialogToLastDialogsSelector,
	removeDialogFromLastDialogsSelector,
	addTypingUser,
	removeTypingUser
} = chatSlice.actions;
