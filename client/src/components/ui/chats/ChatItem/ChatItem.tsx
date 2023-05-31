import styles from './ChatItem.module.scss';
import { Pages } from '@/utils/constants/pages.constants';
import { cn } from '@/utils/helpers/cn.helper';
import { concatPath } from '@/utils/helpers/concatPath';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import ChatItemLastMessage from '@/components/ui/chats/ChatItem/ChatItemLastMessage/ChatItemLastMessage';
import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';

import { useTypedDispatch } from '@/hooks/TypedHooks';
import { useAuthState } from '@/hooks/states/useAuthState';

import { addDialogToLastDialogsSelector } from '@/store/chats/chat.slice';
import { setCurrentChat } from '@/store/chats/currentChat/currentChat';

import { ChatType, IDialog, IGroupChat } from '@/types/chats.types';

interface DialogItemProps {
	chat: IDialog | IGroupChat;
}

const ChatItem: FC<DialogItemProps> = ({ chat }) => {
	const [chatAvatar, setChatAvatar] = useState('');

	const { currentUser } = useAuthState();
	const { replace } = useRouter();
	const dispatch = useTypedDispatch();
	const handleClickToDialog = () => {
		dispatch(setCurrentChat(chat));
		dispatch(addDialogToLastDialogsSelector(chat));
		replace(concatPath(Pages.MESSENGER, chat._id));
	};

	useEffect(() => {
		if (chat.type === ChatType.DIALOG) setChatAvatar((chat as IDialog).user2.avatar);
	}, [chat]);

	return (
		<HStack
			className={cn(styles.container, {
				[styles.unread]:
					chat.lastMessage &&
					!chat.lastMessage.isRead &&
					currentUser?._id !== chat.lastMessage.sender._id
			})}
			onClick={handleClickToDialog}
		>
			<CustomImage
				alt={'chat-avatar'}
				width={120}
				height={120}
				className={styles.avatar}
				src={chatAvatar}
			/>
			<VStack className={styles.chatInfo}>
				<p className={styles.chatTitle}>{chat.title}</p>
				<ChatItemLastMessage chat={chat} />
			</VStack>
		</HStack>
	);
};

export default ChatItem;
