'use client';

import styles from '@/pages/Chats/Chats.module.scss';
import { useEffect } from 'react';

import LazyLoader from '@/components/containers/LazyLoader/LazyLoader';
import Scrollable from '@/components/containers/Scrollable/Scrollable';
import ChatItem from '@/components/ui/chats/ChatItem/ChatItem';
import Loader from '@/components/ui/primitives/Loader/Loader';

import { useChatActions } from '@/hooks/actions/useChatActions';
import { useChatsState } from '@/hooks/states/useChatsState';

const ChatsList = () => {
	const { getChats } = useChatActions();
	const { dialogs, groups, moreOnServer, isLoading } = useChatsState();

	const getData = () => {
		getChats();
	};

	useEffect(() => {
		getData();
	}, []);

	if (isLoading) return <Loader />;

	return (
		<Scrollable axis={'y'} className={styles.list}>
			<LazyLoader
				list={[...groups, ...dialogs]}
				renderItem={chat => <ChatItem key={chat._id} chat={chat} />}
				getData={getData}
				hasNextPage={moreOnServer}
			/>
		</Scrollable>
	);
};

export default ChatsList;
