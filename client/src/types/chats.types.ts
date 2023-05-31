import { IMessage } from '@/types/messages.types';
import { IUser } from '@/types/users.types';

export enum ChatType {
	DIALOG = 'dialog',
	GROUP = 'group'
}

export interface ChatAdditionalFields {
	typingUsers: IUser[];
	lastMessage: IMessage;
}

export interface IChat extends ChatAdditionalFields {
	_id: string;
	title: string;
	messages: IMessage[];
	type: ChatType;
	createdAt: Date;
	updatedAt: Date;
}

export interface IDialog extends IChat {
	user1: IUser;
	user2: IUser;
}

export interface IGroupChat extends IChat {
	users: IUser[];
	admins: IUser[];
}

export interface CreateDialogDto {
	withId: string;
}

export interface CreateGroupChatDto {
	users?: IUser[];
	admins: IUser[];
	title: string;
}

export interface GetChatsResponse {
	chats: IChat[];
}

export interface GetHistoryParams {
	chatId: string;
	page: number;
	limit: number;
}

export interface AddMessageResponse {
	chatId: string;
	type: ChatType;
	message: IMessage;
}
