'use client';

import styles from './MessageItem.module.scss';
import { SocketContext } from '@/providers/AppProviders/SocketProvider';
import { cn } from '@/utils/helpers/cn.helper';
import { FC, useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import useGlobalSocketEvents from '@/hooks/socket/useGlobalSocketEvents';
import { useAuthState } from '@/hooks/states/useAuthState';
import { useCurrentChatState } from '@/hooks/states/useCurrentChatState';

import { IMessage } from '@/types/messages.types';

interface MessageItemProps {
	message: IMessage;
	isEntireBlockUnread: boolean;
}

const MessageItem: FC<MessageItemProps> = ({ message, isEntireBlockUnread }) => {
	const socket = useContext(SocketContext);
	const { currentUser } = useAuthState();
	const { currentChat } = useCurrentChatState();
	const { handleMakeMessageRead } = useGlobalSocketEvents(socket);
	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && currentChat && currentUser && currentUser._id !== message.sender._id) {
			handleMakeMessageRead({
				messageId: message._id,
				chatId: currentChat?._id,
				userId: currentUser?._id
			});
		}
	}, [inView, currentChat]);

	return (
		<p ref={ref} className={cn(styles.messageText, { [styles.unread]: !message.isRead && !isEntireBlockUnread })}>
			{message.messageText}
		</p>
	);
};

export default MessageItem;
