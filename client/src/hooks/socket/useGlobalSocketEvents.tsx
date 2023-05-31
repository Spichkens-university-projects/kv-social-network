'use client';

import { globalChatEvents } from '@/socket/chat.events';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

import { useTypedDispatch } from '@/hooks/TypedHooks';

import { UpdateReadStatusDto } from '@/types/messages.types';
import { SocketEventType } from '@/types/socket-event.type';

const useGlobalSocketEvents = (socket: Socket | null) => {
	const dispatch = useTypedDispatch();

	const handleMakeMessageRead = (updateMessageDto: UpdateReadStatusDto) => {
		socket?.emit('message:update-read-status', updateMessageDto);
	};

	useEffect(() => {
		if (!socket) return;

		globalChatEvents(dispatch).map(({ topic, listener }: SocketEventType) => socket.on(topic, listener));

		return () => {
			globalChatEvents(dispatch).map(({ topic, listener }: SocketEventType) => socket.off(topic, listener));
		};
	}, [socket]);

	return { handleMakeMessageRead };
};

export default useGlobalSocketEvents;
