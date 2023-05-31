import { Dispatch } from 'redux';

import { addTypingUser, removeTypingUser, updateLastMessage } from '@/store/chats/chat.slice';
import { addMessage, makeMessageRead } from '@/store/chats/currentChat/currentChat';

import { AddMessageResponse, IChat } from '@/types/chats.types';
import { UpdateReadStatusDto } from '@/types/messages.types';
import { SocketEventType } from '@/types/socket-event.type';
import { IUser } from '@/types/users.types';

export const chatEvents: (dispatch: Dispatch) => SocketEventType[] = (dispatch: Dispatch) => {
	return [
		{
			topic: 'message:send-to-client',
			listener: (response: AddMessageResponse) => dispatch(addMessage(response.message))
		}
	];
};

export const globalChatEvents: (dispatch: Dispatch) => SocketEventType[] = (dispatch: Dispatch) => {
	return [
		{
			topic: 'chat:update-last-message',
			listener: (response: AddMessageResponse) => dispatch(updateLastMessage(response))
		},
		{
			topic: 'message:read-status-updated',
			listener: (updateReadStatusDto: UpdateReadStatusDto) => dispatch(makeMessageRead(updateReadStatusDto))
		},
		{
			topic: 'chat:get-typing-user',
			listener: ({ typingUser, chatWhereTyping }: { typingUser: IUser; chatWhereTyping: IChat }) =>
				dispatch(addTypingUser({ typingUser, chatWhereTyping }))
		},
		{
			topic: 'chat:get-stopped-typing-user',
			listener: ({ typingUser, chatWhereTyping }: { typingUser: IUser; chatWhereTyping: IChat }) => {
				dispatch(removeTypingUser({ typingUser, chatWhereTyping }));
			}
		}
	];
};
