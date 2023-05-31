import { cn } from '@/utils/helpers/cn.helper';
import React from 'react';
import { RxCross2 } from 'react-icons/rx';

import HStack from '@/components/containers/Stack/HStack/HStack';
import Icon from '@/components/ui/primitives/Icon/Icon';
import SelectorMenu from '@/components/ui/selector/SelectorMenu/SelectorMenu';

import { useTypedDispatch } from '@/hooks/TypedHooks';
import { useChatsState } from '@/hooks/states/useChatsState';
import { useCurrentChatState } from '@/hooks/states/useCurrentChatState';

import { removeDialogFromLastDialogsSelector } from '@/store/chats/chat.slice';
import { setCurrentChat } from '@/store/chats/currentChat/currentChat';

const LastChatsSelector = () => {
	const { currentChat } = useCurrentChatState();
	const { lastChats } = useChatsState();
	const dispatch = useTypedDispatch();

	return lastChats.length ? (
		<SelectorMenu
			list={lastChats}
			renderItem={(item, index) => (
				<HStack
					className={'items-center'}
					key={index}
					onClick={() => dispatch(setCurrentChat(item))}
				>
					<p
						className={cn(
							'grow py-1 px-2 rounded-sm cursor-pointer select-none hover:bg-hover-light dark:hover:bg-hover-dark',
							{
								'bg-hover-light dark:bg-hover-dark': item._id === currentChat?._id
							}
						)}
					>
						{item.title}
					</p>
					<Icon
						icon={RxCross2}
						onClick={() => dispatch(removeDialogFromLastDialogsSelector(item._id))}
						className={'cursor-pointer'}
					/>
				</HStack>
			)}
		/>
	) : (
		<div className={'bg-block-light dark:bg-block-dark rounded-lg shadow-md p-4 gap-2 text-center'}>
			Нет последних чатов
		</div>
	);
};

export default LastChatsSelector;
