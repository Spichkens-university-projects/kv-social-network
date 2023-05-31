import { axiosWithToken } from '@/axios/axios';

import {
	CreateDialogDto,
	CreateGroupChatDto,
	GetHistoryParams,
	IChat,
	IDialog,
	IGroupChat
} from '@/types/chats.types';
import { IMessage } from '@/types/messages.types';

export const ChatService = {
	async createDialog({ withId }: CreateDialogDto) {
		const response = await axiosWithToken.post<IDialog>(
			`/chats/create-dialog`,
			{},
			{ params: { withId } }
		);
		return response.data;
	},

	async createGroupChat({ title, users, admins }: CreateGroupChatDto) {
		const response = await axiosWithToken.post<IGroupChat>(`/chats/create-dialog`, {
			title,
			users,
			admins
		});
		return response.data;
	},

	async getChats() {
		const response = await axiosWithToken.get<IChat[]>('/chats');
		return response.data;
	},

	async getById(chatId: string) {
		const response = await axiosWithToken.get<IGroupChat | IDialog>(`/chats/by-id/${chatId}`);
		return response.data;
	},

	async getHistory(params: GetHistoryParams) {
		const response = await axiosWithToken.get<IMessage[]>(`/chats/history`, { params });
		return response.data;
	}
};
