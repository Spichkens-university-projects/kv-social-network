'use client';

import styles from './MessagesList.module.scss';
import { MESSAGES_LIST_COUNT_LIMIT } from '@/utils/constants/lists.constants';
import { sentAtDifferentMinutes } from '@/utils/helpers/compare-dates';
import { forwardRef, useEffect, useState } from 'react';

import LazyLoader from '@/components/containers/LazyLoader/LazyLoader';
import Scrollable from '@/components/containers/Scrollable/Scrollable';
import MessageBlock from '@/components/ui/messenger/MessageBlock/MessageBlock';

import { useTypedDispatch } from '@/hooks/TypedHooks';
import { useChatActions } from '@/hooks/actions/useChatActions';
import { useCurrentChatState } from '@/hooks/states/useCurrentChatState';

import { resetCurrentChat } from '@/store/chats/currentChat/currentChat';

import { IMessage, IMessageBlock } from '@/types/messages.types';

const MessagesList = forwardRef<HTMLDivElement>((props, ref) => {
	const dispatch = useTypedDispatch();
	const { currentChat, messages, moreOnServer, isLoading } = useCurrentChatState();
	const [messageBlocks, setMessageBlocks] = useState<IMessageBlock[]>([]);

	const { getHistory } = useChatActions();
	const [page, setPage] = useState(1);

	const getData = () => {
		if (currentChat) {
			getHistory({
				page,
				limit: MESSAGES_LIST_COUNT_LIMIT,
				chatId: currentChat?._id
			});
			setPage(prevState => prevState + 1);
		}
	};

	useEffect(() => {
		const result = messages.reduce((blocks: IMessageBlock[], message: IMessage, index: number) => {
			const lastBlock = blocks[blocks.length - 1];
			const lastMessageOfLastBlock = lastBlock && lastBlock.messages[lastBlock.messages.length - 1];
			if (blocks.length === 0) blocks.push({ messages: [message], sender: message.sender });
			else {
				if (
					lastBlock &&
					lastBlock.sender._id === message.sender._id &&
					sentAtDifferentMinutes(lastMessageOfLastBlock.createdAt, message.createdAt)
				)
					blocks[blocks.length - 1].messages.unshift(message);
				else blocks.push({ messages: [message], sender: message.sender });
			}

			return blocks;
		}, []);

		setMessageBlocks(result);
	}, [messages]);

	useEffect(() => {
		return () => {
			dispatch(resetCurrentChat());
		};
	}, []);

	return (
		<Scrollable reverse={true} axis={'y'} className={styles.container}>
			<LazyLoader
				ref={ref}
				itemsSpacing={2}
				reverse={true}
				list={messageBlocks}
				getData={getData}
				hasNextPage={moreOnServer}
				renderItem={(messageBlock, index) => <MessageBlock messageBlock={messageBlock} key={index} />}
			/>
		</Scrollable>
	);
});

MessagesList.displayName = 'MessageList';

export default MessagesList;
