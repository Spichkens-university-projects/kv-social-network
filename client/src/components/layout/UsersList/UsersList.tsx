import styles from './UsersList.module.scss';
import { FC } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import UsersListItem from '@/components/layout/UsersList/UsersListItem/UsersListItem';
import DotCounter from '@/components/ui/primitives/DotCounter/DotCounter';
import EmptyListPlug from '@/components/ui/primitives/blocks/EmptyListPlug/EmptyListPlug';

import { IOtherUser } from '@/types/relation.types';
import { IUser } from '@/types/users.types';

interface UsersListProps {
	list: IOtherUser[] | IUser[];
	label: string;
}

const UsersList: FC<UsersListProps> = ({ label, list }) => {
	return (
		<VStack className={styles.container}>
			<HStack className={styles.label}>
				{label}
				<DotCounter number={list.length} />
			</HStack>
			{list.length ? (
				<VStack className={styles.list}>
					{list.map((item, index) => (
						<UsersListItem key={index} user={item} />
					))}
				</VStack>
			) : (
				<EmptyListPlug text={'Список пуст'} />
			)}
		</VStack>
	);
};

export default UsersList;
