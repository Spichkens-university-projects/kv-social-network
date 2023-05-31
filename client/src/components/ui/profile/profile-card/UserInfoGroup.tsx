'use client';

import styles from './ProfleCard.module.scss';
import Link from 'next/link';
import { FC } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import Button from '@/components/ui/primitives/buttons/SubmitButton/Button';
import ProfileAvatar from '@/components/ui/profile/profile-card/ProfileAvatar';

import { IUser } from '@/types/users.types';

interface UserInfoGroupProps {
	user: IUser;
	isCurrentUser: boolean;
}

const UserInfoGroup: FC<UserInfoGroupProps> = ({ isCurrentUser, user }) => {
	return (
		<HStack className={styles.infoGroupContainer}>
			<ProfileAvatar src={user.avatar} isCurrentUser={isCurrentUser} />
			<HStack className={'w-full p-4 pl-52'}>
				<VStack className={'flex-grow gap-4'}>
					<div>
						<p className={styles.name}>{`${user.name} ${user.surname}`}</p>
						<p className={styles.username}>{user.username}</p>
					</div>
					<p className={styles.status}>{user.status}</p>
				</VStack>
			</HStack>

			{isCurrentUser ? (
				<Button variant={'secondary'} className={'absolute bottom-3 right-3'}>
					Редактировать
				</Button>
			) : (
				//TODO редирект на диалог с этим человеком
				<Link href={'/chats/1'} className={'absolute bottom-3 right-3'}>
					<Button variant={'primary'}>Сообщение</Button>
				</Link>
			)}
		</HStack>
	);
};

export default UserInfoGroup;
