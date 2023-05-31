'use client';

import styles from './FriendsList.module.scss';
import { FRIENDS_LIST_COUNT_LIMIT } from '@/utils/constants/lists.constants';
import { ChangeEvent, useEffect, useState } from 'react';

import LazyLoader from '@/components/containers/LazyLoader/LazyLoader';
import Scrollable from '@/components/containers/Scrollable/Scrollable';
import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import FriendsListItem from '@/components/ui/friends/FriendsListItem/FriendsListItem';
import DotCounter from '@/components/ui/primitives/DotCounter/DotCounter';
import Loader from '@/components/ui/primitives/Loader/Loader';
import SearchField from '@/components/ui/primitives/SearchField/SearchField';

import { useTypedDispatch } from '@/hooks/TypedHooks';
import useDebounce from '@/hooks/local/useDebounce';
import { useAuthState } from '@/hooks/states/useAuthState';
import { useRelationsState } from '@/hooks/states/useRelationsState';

import { UserService } from '@/services/user.service';

import { setListToRender } from '@/store/relations/relations.slice';

const FriendsList = () => {
	const { currentUser } = useAuthState();
	const [page, setPage] = useState(1);
	const dispatch = useTypedDispatch();
	const {
		friends,
		listToRender: { title, list },
		moreOnServer,
		isLoading
	} = useRelationsState();

	const [searchTerm, setSearchTerm] = useState<string>('');
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	const getUsers = () => {
		if (debouncedSearchTerm.length > 0) {
			UserService.getAllUsers({
				searchTerm: debouncedSearchTerm,
				limit: FRIENDS_LIST_COUNT_LIMIT,
				page
			}).then(users => {
				dispatch(
					setListToRender({
						title: 'Поиск друзей',
						list: users.filter(user => user._id !== currentUser?._id)
					})
				);
			});
		}
	};

	useEffect(() => {
		getUsers();
	}, [debouncedSearchTerm]);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

	return (
		<VStack className={styles.container}>
			<HStack className={styles.header}>
				<p>{title}</p>
				<DotCounter number={list?.length || 0} />
			</HStack>
			<SearchField onChange={onChange} onFocus={getUsers} />
			{list && !list.length && <center>Список пуст</center>}
			{isLoading ? (
				<Loader />
			) : (
				<Scrollable axis={'y'}>
					<LazyLoader
						itemsSpacing={4}
						hasNextPage={true}
						list={list}
						renderItem={friend => <FriendsListItem user={friend} key={friend._id} />}
						getData={getUsers}
					/>
				</Scrollable>
			)}
		</VStack>
	);
};

export default FriendsList;
