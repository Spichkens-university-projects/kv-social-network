'use client';

import styles from './Messenger.module.scss';
import { SocketContext } from '@/providers/AppProviders/SocketProvider';
import { Pages } from '@/utils/constants/pages.constants';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useRef } from 'react';

import VStack from '@/components/containers/Stack/VStack/VStack';
import RightSidebar from '@/components/layout/RightSidebar/RightSidebar';
import LastChatsSelector from '@/components/ui/chats/LastChats/LastChatsSelector';
import MessageInput from '@/components/ui/messenger/MessageInput/MessageInput';
import MessagesList from '@/components/ui/messenger/MessagesList/MessagesList';
import MessengerHeader from '@/components/ui/messenger/MessengerHeader/MessengerHeader';

import useKeyPress from '@/hooks/local/useKeyPress';
import useChat from '@/hooks/socket/useChat';

const Messenger = () => {
	const socket = useContext(SocketContext);
	const { sendMessage } = useChat(socket);
	const { replace } = useRouter();
	const messageRef = useRef<HTMLTextAreaElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	const handleGoBack = () => {
		replace(Pages.MESSENGER);
	};

	const scrollToTheEnd = () => {
		scrollRef?.current?.scrollIntoView({ inline: 'center' });
	};

	const handleSendMessage = async () => {
		if (messageRef.current && messageRef.current.value) {
			await sendMessage({ messageText: messageRef?.current?.value });
			messageRef.current.value = '';
			scrollToTheEnd();
		}
	};

	useEffect(() => {
		scrollToTheEnd();
	}, []);

	useKeyPress('Escape', handleGoBack);
	useKeyPress('Enter', handleSendMessage);
	return (
		<>
			<VStack className={styles.container}>
				<MessengerHeader />
				<MessagesList ref={scrollRef} />
				<MessageInput ref={messageRef} handleSendMessage={handleSendMessage} />
			</VStack>
			<RightSidebar>
				<LastChatsSelector />
			</RightSidebar>
		</>
	);
};

export default Messenger;
