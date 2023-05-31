'use client';

import { chatEvents } from '@/socket/chat.events';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

import { useTypedDispatch } from '@/hooks/TypedHooks';
import { useAuthState } from '@/hooks/states/useAuthState';
import { useCurrentChatState } from '@/hooks/states/useCurrentChatState';

import { SocketEventType } from '@/types/socket-event.type';

const useChat = (socket: Socket | null) => {
	const dispatch = useTypedDispatch();
	const { currentUser } = useAuthState();
	const { currentChat } = useCurrentChatState();

	const sendMessage = async ({ messageText }: { messageText: string }) => {
		await socket?.emit('message:send-to-server', {
			senderId: currentUser?._id,
			messageText,
			chatId: currentChat?._id
		});
	};

	useEffect(() => {
		if (!socket) return;
		socket.emit('chat:user-joined', { chatId: currentChat?._id });

		chatEvents(dispatch).map(({ topic, listener }: SocketEventType) => socket.on(topic, listener));

		return () => {
			socket.off();
			chatEvents(dispatch).map(({ topic, listener }: SocketEventType) => socket.off(topic, listener));
		};
	}, [socket, currentChat]);

	return { sendMessage };
};

export default useChat;
