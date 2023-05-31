import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import PopupDots from '@/components/ui/friends/PopupDots/PopupDots';
import PopupItem from '@/components/ui/popup/PopupItem/PopupItem';

import { useTypedDispatch } from '@/hooks/TypedHooks';

import { RelationService } from '@/services/relation.service';

import {
	acceptFriendRequest,
	cancelFriendRequest,
	rejectFriendRequest,
	removeFriend
} from '@/store/relations/relations.slice';

import { IOtherUser, RelationStatus } from '@/types/relation.types';

interface ManageUserButtonsProps {
	user?: IOtherUser;
}

const ManageUserButtons: FC<ManageUserButtonsProps> = ({ user }) => {
	const [currentRelationStatus, setCurrentRelationStatus] = useState<RelationStatus | null>();
	const dispatch = useTypedDispatch();

	useEffect(() => {
		setCurrentRelationStatus(user?.relationStatus);
	}, []);

	const handleSendFriendRequest = () => {
		if (user) {
			RelationService.sendFriendRequest(user._id)
				.then(res => {
					toast.success(
						user.relationStatus === RelationStatus.SUBSCRIPTION
							? 'Заявка отменена'
							: 'Заявка отправлена'
					);
					setCurrentRelationStatus(RelationStatus.SUBSCRIPTION);
				})
				.catch(() => toast.error('Ошибка отправки запроса'));
		}
	};

	const handleRemoveFriend = () => {
		if (user) {
			RelationService.removeFriend(user._id)
				.then(res => {
					dispatch(removeFriend(res));
					toast.success('Друг удален');
					setCurrentRelationStatus(RelationStatus.SUBSCRIBER);
				})
				.catch(() => toast.error('Ошибка удаления'));
		}
	};

	const handleCancelSubscription = () => {
		if (user) {
			RelationService.sendFriendRequest(user._id)
				.then(res => {
					dispatch(cancelFriendRequest(res));
					toast.success('Подписка отменена');
					setCurrentRelationStatus(null);
				})
				.catch(() => toast.error('Ошибка удаления'));
		}
	};

	const handleAcceptFriendRequest = () => {
		if (user) {
			RelationService.acceptFriendRequest(user._id).then(response => {
				dispatch(acceptFriendRequest(response));
				toast.success('Запрос в друзья принят');
				setCurrentRelationStatus(RelationStatus.FRIEND);
			});
		}
	};

	const handleRejectRequest = () => {
		if (user)
			RelationService.rejectFriendRequest(user._id).then(response => {
				dispatch(rejectFriendRequest(response));
				toast.success('Запрос в друзья отклонен');
				setCurrentRelationStatus(null);
			});
	};

	return (
		<PopupDots>
			{currentRelationStatus === RelationStatus.FRIEND && (
				<PopupItem color={'#E60023'} label={'Удалить из друзей'} action={handleRemoveFriend} />
			)}
			{currentRelationStatus === RelationStatus.SUBSCRIPTION && (
				<PopupItem color={'#E60023'} label={'Отменить заявку'} action={handleCancelSubscription} />
			)}
			{currentRelationStatus === RelationStatus.SUBSCRIBER && (
				<>
					<PopupItem color={'#E60023'} label={'Принять'} action={handleAcceptFriendRequest} />
					<PopupItem color={'#E60023'} label={'Отказать'} action={handleRejectRequest} />
				</>
			)}
			{currentRelationStatus === undefined && (
				<PopupItem color={'#E60023'} label={'Добавить в друзья'} action={handleSendFriendRequest} />
			)}
		</PopupDots>
	);
};

export default ManageUserButtons;
