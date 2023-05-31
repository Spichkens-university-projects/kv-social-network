'use client';

import { SocketContext } from '@/providers/AppProviders/SocketProvider';
import React, { useContext, useEffect, useState } from 'react';

import { useAuthState } from '@/hooks/states/useAuthState';
import { useCurrentChatState } from '@/hooks/states/useCurrentChatState';

const useTyping = () => {
	const socket = useContext(SocketContext);
	const [value, setValue] = useState('');
	const [lastValue, setLastValue] = useState('');
	const { currentUser } = useAuthState();
	const { currentChat } = useCurrentChatState();

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(event.target.value);
		setLastValue(event.target.value);
		socket?.emit('chat:user-start-typing', { userId: currentUser?._id, chatId: currentChat?._id });
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			if (lastValue === value) {
				socket?.emit('chat:user-stop-typing', { userId: currentUser?._id, chatId: currentChat?._id });
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [value, lastValue]);

	return { handleChange };
};

export default useTyping;
