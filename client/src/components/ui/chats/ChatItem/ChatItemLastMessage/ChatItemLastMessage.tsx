'use client';

import styles from './ChatItemLastMessage.module.scss';
import { SocketContext } from '@/providers/AppProviders/SocketProvider';
import { cn } from '@/utils/helpers/cn.helper';
import { concatNameWithShortSurname } from '@/utils/helpers/concatName';
import { FC, useContext } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';

import useGlobalSocketEvents from '@/hooks/socket/useGlobalSocketEvents';
import { useAuthState } from '@/hooks/states/useAuthState';

import { ChatType, IChat } from '@/types/chats.types';

interface ChatItemLastMessageProps {
	chat: IChat;
}

const ChatItemLastMessage: FC<ChatItemLastMessageProps> = ({ chat }) => {
	const { currentUser } = useAuthState();
	const socket = useContext(SocketContext);
	useGlobalSocketEvents(socket);

	const isLastMessageExists = chat.lastMessage;
	const isLastMessageRead = isLastMessageExists && isLastMessageExists.isRead;
	const isSomeoneTyping = chat.typingUsers.length;
	const isCurrentUserIsLastMessageSender =
		isLastMessageExists && chat.lastMessage.sender._id === currentUser?._id;

	if (!isLastMessageExists && !isSomeoneTyping)
		return <p className={styles.blueText}>Пока нет сообщений</p>;

	if (!isCurrentUserIsLastMessageSender && !isSomeoneTyping)
		return <p className={cn(styles.messageText)}>{chat.lastMessage.messageText}</p>;

	if (isSomeoneTyping && chat.type === ChatType.DIALOG)
		return <p className={styles.blueText}>Пишет...</p>;

	if (isSomeoneTyping && chat.type === ChatType.GROUP)
		return (
			<p className={styles.blueText}>
				{chat.typingUsers.map((user, index) => (
					<HStack key={user._id}>
						<p>{concatNameWithShortSurname(user)}</p>
						{chat.typingUsers.length !== 1 && index < chat.typingUsers.length - 1 ? ', ' : null}
						<p>{chat.typingUsers.length > 1 ? 'пишут...' : 'пишет...'}</p>
					</HStack>
				))}
			</p>
		);

	if (isCurrentUserIsLastMessageSender)
		return (
			<HStack className={styles.messageStack}>
				<CustomImage
					alt={'sender-avatar'}
					width={50}
					height={50}
					src={chat.lastMessage.sender.avatar}
					className={styles.avatar}
				/>
				<p className={cn(styles.messageText, { [styles.unread]: !isLastMessageRead })}>
					{chat.lastMessage.messageText}
				</p>
			</HStack>
		);

	return null;
};

export default ChatItemLastMessage;
