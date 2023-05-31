'use client';

import styles from './FriendsListItem.module.scss';
import { Pages } from '@/utils/constants/pages.constants';
import { concatPath } from '@/utils/helpers/concatPath';
import { useRouter } from 'next/navigation';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import CreateDialogButton from '@/components/ui/friends/CreateDialogButton/CreateDialogButton';
import ManageUserButtons from '@/components/ui/friends/ManageUserButtons';
import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';

import { IOtherUser } from '@/types/relation.types';

interface FriendListItemProps {
	user: IOtherUser;
}

const FriendsListItem = ({ user }: FriendListItemProps) => {
	const { replace } = useRouter();
	const profileLink = concatPath(Pages.PROFILE, user.username);
	const redirectToProfile = () => {
		replace(profileLink);
	};

	return (
		<HStack className={styles.container}>
			<CustomImage
				src={user.avatar}
				alt={'avatar'}
				width={300}
				height={300}
				onClick={redirectToProfile}
				className={styles.avatar}
			/>
			<VStack className={styles.userInfo}>
				<VStack>
					<p
						onClick={redirectToProfile}
						className={styles.name}
					>{`${user?.name} ${user?.surname}`}</p>
					<p onClick={redirectToProfile} className={styles.username}>
						{user?.username}
					</p>
				</VStack>
				<CreateDialogButton user={user} />
			</VStack>
			<ManageUserButtons user={user} />
		</HStack>
	);
};

export default FriendsListItem;
