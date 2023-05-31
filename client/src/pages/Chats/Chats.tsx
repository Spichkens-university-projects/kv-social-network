'use client';

import styles from './Chats.module.scss';
import React from 'react';

import VStack from '@/components/containers/Stack/VStack/VStack';
import RightSidebar from '@/components/layout/RightSidebar/RightSidebar';
import ChatsList from '@/components/ui/chats/ChatsList';
import LastChatsSelector from '@/components/ui/chats/LastChats/LastChatsSelector';
import SearchField from '@/components/ui/primitives/SearchField/SearchField';

const Chats = () => {
	return (
		<>
			<VStack className={styles.container}>
				<VStack className={styles.header}>
					<SearchField />
				</VStack>
				<ChatsList />
			</VStack>
			<RightSidebar>
				<LastChatsSelector />
			</RightSidebar>
		</>
	);
};

export default Chats;
