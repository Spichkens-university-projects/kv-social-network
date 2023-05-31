'use client';

import styles from './ProfleCard.module.scss';
import { cn } from '@/utils/helpers/cn.helper';
import { uploadHelper } from '@/utils/helpers/upload-file.helper';
import { ChangeEvent, useRef, useState } from 'react';

import Popup from '@/components/ui/popup/Popup';
import PopupItem from '@/components/ui/popup/PopupItem/PopupItem';
import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';

import { useTypedDispatch } from '@/hooks/TypedHooks';
import { useAuthState } from '@/hooks/states/useAuthState';

import { FileService } from '@/services/file.service';
import { UserService } from '@/services/user.service';

import { updateUser } from '@/store/auth/auth.slice';

import { IFile } from '@/types/files.types';

const ProfileAvatar = ({ src, isCurrentUser }: { src: string; isCurrentUser: boolean }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useTypedDispatch();
	const { currentUser } = useAuthState();

	const [isAvatarFunctionsPopupOpen, setIsAvatarFunctionsPopupOpen] = useState<boolean>(false);

	const closeAvatarFunctionsModal = () => {
		setIsAvatarFunctionsPopupOpen(false);
	};
	const openAvatarFunctionsModal = () => {
		setIsAvatarFunctionsPopupOpen(true);
	};

	const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
		await uploadHelper(event, `/avatars`, updateUserAfterChangingAvatar);
	};

	const updateUserAfterChangingAvatar = (file: IFile) => {
		UserService.updateUser({ avatar: file.url }).then(response => {
			dispatch(updateUser(response));
		});
	};

	const deleteAvatar = async () => {
		if (currentUser?.avatar) {
			await FileService.deleteFile(currentUser.avatar).then(response => {
				if (response) {
					UserService.updateUser({ avatar: '' }).then(response => dispatch(updateUser(response)));
				}
			});
		}
	};

	return (
		<div className={'absolute bottom-16 md:bottom-12 left-12'} onClick={openAvatarFunctionsModal}>
			<CustomImage
				src={src}
				alt={'avatar'}
				width={300}
				height={300}
				className={cn(styles.avatar, { 'cursor-pointer': isCurrentUser })}
			/>
			{isCurrentUser ? (
				<Popup
					onClose={closeAvatarFunctionsModal}
					isOpen={isAvatarFunctionsPopupOpen}
					className={'bottom-0 md:-bottom-[80px] right-0 md:right-[0px]'}
				>
					<PopupItem color={'#0077B5'} label={'Изменить'} action={() => inputRef?.current?.click()}>
						<input
							hidden
							accept='image/*'
							type='file'
							multiple={true}
							onChange={onChangeFile}
							ref={inputRef}
						/>
					</PopupItem>
					<PopupItem color={'#E60023'} label={'Удалить'} action={deleteAvatar} />
				</Popup>
			) : null}
		</div>
	);
};

export default ProfileAvatar;
