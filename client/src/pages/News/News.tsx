'use client';

import styles from './News.module.scss';
import { useEffect, useState } from 'react';

import VStack from '@/components/containers/Stack/VStack/VStack';
import RequestsList from '@/components/layout/RequestsList/RequestsList';
import RightSidebar from '@/components/layout/RightSidebar/RightSidebar';
import CreatePostBlock from '@/components/ui/posts/CreatePost/CreatePostBlock';
import PostsList from '@/components/ui/posts/PostsList/PostsList';

import { useAuthState } from '@/hooks/states/useAuthState';
import { useRelationsState } from '@/hooks/states/useRelationsState';

const News = () => {
	const { currentUser } = useAuthState();
	const { friends, subscriptions } = useRelationsState();

	const [filter, setFilter] = useState<string[]>([]);

	useEffect(() => {
		const f = [
			...friends.map(friend => friend._id),
			...subscriptions.map(subscription => subscription._id)
		];
		if (currentUser) f.push(currentUser._id);
		setFilter(f);
	}, [friends, subscriptions]);

	return (
		<>
			<VStack className={styles.vertContainer}>
				<CreatePostBlock />
				<PostsList filter={filter} />
			</VStack>
			<RightSidebar>
				<RequestsList />
			</RightSidebar>
		</>
	);
};

export default News;
