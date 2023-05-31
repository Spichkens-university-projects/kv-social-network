'use client';

import styles from './RelationsSelector.module.scss';
import { cn } from '@/utils/helpers/cn.helper';
import React, { useEffect, useState } from 'react';

import VStack from '@/components/containers/Stack/VStack/VStack';
import SelectorMenu from '@/components/ui/selector/SelectorMenu/SelectorMenu';

import { useTypedDispatch } from '@/hooks/TypedHooks';
import { useRelationActions } from '@/hooks/actions/useRelationActions';
import { useRelationsState } from '@/hooks/states/useRelationsState';

import { setListToRender } from '@/store/relations/relations.slice';

import { RelationSelectorItemType } from '@/types/relation.types';

const RelationsSelector = () => {
	const dispatch = useTypedDispatch();
	const { getFriends, getSubscribers, getSubscriptions } = useRelationActions();
	const { friends, subscriptions, subscribers } = useRelationsState();
	const [currentSelectorItem, setCurrentSelectorItem] = useState<RelationSelectorItemType>({
		title: 'Друзья',
		list: friends,
		getData: getFriends
	});
	const selectorItems: RelationSelectorItemType[] = [
		{
			title: 'Друзья',
			getData: getFriends,
			list: friends
		},
		{
			title: 'Подписчики',
			getData: getSubscribers,
			list: subscribers
		},
		{
			title: 'Подписки',
			getData: getSubscriptions,
			list: subscriptions
		}
	];

	const updateList = (item: RelationSelectorItemType) => {
		setCurrentSelectorItem(item);
		item.getData();
	};

	useEffect(() => {
		dispatch(setListToRender({ title: 'Друзья', list: friends }));
	}, []);

	return (
		<SelectorMenu
			list={selectorItems}
			renderItem={(item, index) => (
				<VStack
					key={index}
					onClick={() => updateList(item)}
					className={cn(styles.default, {
						[styles.selected]: item.title === currentSelectorItem.title
					})}
				>
					{item.title}
				</VStack>
			)}
		/>
	);
};

export default RelationsSelector;
