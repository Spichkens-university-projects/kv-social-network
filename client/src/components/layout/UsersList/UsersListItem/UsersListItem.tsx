import styles from './UsersListItem.module.scss';
import { Pages } from '@/utils/constants/pages.constants';
import { concatName } from '@/utils/helpers/concatName';
import { concatPath } from '@/utils/helpers/concatPath';
import Link from 'next/link';
import { FC } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';

import { IOtherUser } from '@/types/relation.types';
import { IUser } from '@/types/users.types';

interface UsersListItemProps {
	user: IOtherUser | IUser;
}

const UsersListItem: FC<UsersListItemProps> = ({ user }) => {
	return (
		<Link href={concatPath(Pages.PROFILE, user?.username)}>
			<HStack className={styles.container}>
				<CustomImage alt={'user-avatar'} width={40} height={40} className={styles.avatar} />
				<VStack>
					<p className={styles.name}>{concatName(user)}</p>
					<p className={styles.username}>{user.username}</p>
				</VStack>
			</HStack>
		</Link>
	);
};

export default UsersListItem;
