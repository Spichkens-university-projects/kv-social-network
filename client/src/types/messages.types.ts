import { IFile } from '@/types/files.types';
import { IUser } from '@/types/users.types';

export interface IMessage {
	_id: string;
	sender: IUser;
	messageText: string;
	media: IFile[];
	createdAt: Date;
	updatedAt: Date;
	isRead: boolean;
}

export interface IMessageBlock {
	sender: IUser;
	messages: IMessage[];
}

export interface UpdateReadStatusDto {
	messageId: string;
	chatId: string;
	userId: string;
}
