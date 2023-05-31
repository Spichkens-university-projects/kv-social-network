import styles from './RequestListItem.module.scss';
import { FC } from 'react';
import toast from 'react-hot-toast';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';
import Button from '@/components/ui/primitives/buttons/SubmitButton/Button';

import { useTypedDispatch } from '@/hooks/TypedHooks';

import { RelationService } from '@/services/relation.service';

import { acceptFriendRequest, rejectFriendRequest } from '@/store/relations/relations.slice';

import { IOtherUser } from '@/types/relation.types';

interface RequestListItemProps {
	subscriber: IOtherUser;
}

const RequestListItem: FC<RequestListItemProps> = ({ subscriber }) => {
	const dispatch = useTypedDispatch();

	const handleAcceptFriendRequest = () => {
		if (subscriber) {
			RelationService.acceptFriendRequest(subscriber._id).then(response => {
				dispatch(acceptFriendRequest(response));
				toast.success('Запрос в друзья принят');
			});
		}
	};

	const handleRejectRequest = () => {
		if (subscriber)
			RelationService.rejectFriendRequest(subscriber._id).then(response => {
				dispatch(rejectFriendRequest(response));
				toast.success('Запрос в друзья отклонен');
			});
	};

	return (
		<VStack className={styles.container}>
			<HStack className={styles.user}>
				<CustomImage alt={'user-avatar'} width={40} height={40} className={styles.avatar} />
				<VStack>
					<p className={styles.name}>Саша Спичка</p>
					<p className={styles.description}>Отправил вам запрос дружбы</p>
				</VStack>
			</HStack>
			<HStack className={styles.buttons}>
				<Button variant={'primary'} onClick={handleAcceptFriendRequest}>
					Принять
				</Button>
				<Button variant={'secondary'} onClick={handleRejectRequest}>
					Отказать
				</Button>
			</HStack>
		</VStack>
	);
};

export default RequestListItem;
