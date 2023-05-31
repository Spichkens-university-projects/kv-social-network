'use client';

import styles from './MessageBlock.module.scss';
import { cn } from '@/utils/helpers/cn.helper';
import { absoluteTime } from '@/utils/helpers/dayjs.helper';
import { FC, memo } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import MessageItem from '@/components/ui/messenger/MessageItem/MessageItem';
import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';

import { useAuthState } from '@/hooks/states/useAuthState';

import { IMessageBlock } from '@/types/messages.types';

const allMessagesInBlockArentRead = (block: IMessageBlock) => {
	return block.messages.filter(message => !message.isRead).length === block.messages.length;
};

interface MessageBlockProps {
	messageBlock: IMessageBlock;
}

const MessageBlock: FC<MessageBlockProps> = ({ messageBlock }) => {
	const { currentUser } = useAuthState();
	const isEntireBlockUnread = allMessagesInBlockArentRead(messageBlock);
	return (
		<HStack
			className={cn(styles.container, {
				[styles.unread]: isEntireBlockUnread && messageBlock.sender._id === currentUser?._id
			})}
		>
			<CustomImage alt={'user-avatar'} width={45} height={45} className={styles.avatar} />
			<VStack className={'w-[450px]'}>
				<HStack className={styles.horStack}>
					<p className={styles.senderName}>{messageBlock.sender.name}</p>
					<p className={styles.timestamp}>{absoluteTime(messageBlock.messages[0].createdAt)}</p>
				</HStack>

				<VStack className={styles.messagesStack}>
					{messageBlock.messages.map(message => (
						<MessageItem message={message} key={message._id} isEntireBlockUnread={isEntireBlockUnread} />
					))}
				</VStack>
			</VStack>
		</HStack>
	);
};

MessageBlock.displayName = 'MessageBlock';

export default memo(MessageBlock);
