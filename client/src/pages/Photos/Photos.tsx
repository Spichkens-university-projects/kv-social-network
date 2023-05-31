'use client';

import styles from './Photos.module.scss';
import { concatName } from '@/utils/helpers/concatName';
import { uploadHelper } from '@/utils/helpers/upload-file.helper';
import { ChangeEvent, FC, useEffect, useState } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';
import AttachmentButton from '@/components/ui/primitives/buttons/AttachmentButton/AttachmentButton';
import Button from '@/components/ui/primitives/buttons/SubmitButton/Button';

import { useTypedDispatch } from '@/hooks/TypedHooks';
import { useAuthState } from '@/hooks/states/useAuthState';

import { UserService } from '@/services/user.service';

import { updateUser } from '@/store/auth/auth.slice';

import { IFile } from '@/types/files.types';

interface PostsProps {
	username: string;
}

const Photos: FC<PostsProps> = ({ username }) => {
	const dispatch = useTypedDispatch();

	const [whosPhotos, setWhosPhotos] = useState('');
	const [photos, setPhotos] = useState<string[]>([]);

	const { currentUser } = useAuthState();
	const isCurrentUser = currentUser?.username === username;
	const photosToRender = isCurrentUser ? currentUser?.photos : photos;

	useEffect(() => {
		UserService.getUserByUsername(username).then(user => {
			setWhosPhotos(concatName(user));
			setPhotos(user.photos);
		});
	}, [username]);

	const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
		await uploadHelper(event, `/photos`, updateUserAfterAddingNewPhoto);
	};

	const updateUserAfterAddingNewPhoto = (file: IFile) => {
		UserService.addNewPhoto(file.url).then(response => {
			dispatch(updateUser(response));
		});
	};

	return (
		<VStack className={styles.VContainer}>
			<HStack className={styles.Hcontainer}>
				<p className={'font-semibold'}>Фотографии {whosPhotos}</p>
				<AttachmentButton onChange={onChangeFile}>
					<Button variant={'secondary'}>Добавить фото</Button>
				</AttachmentButton>
			</HStack>
			<HStack className={'gap-2 flex-wrap'}>
				{photosToRender ? (
					photosToRender.map((photoUrl, index) => (
						<CustomImage
							src={photoUrl}
							alt={'photo'}
							key={index}
							width={500}
							height={500}
							className={styles.photo}
						/>
					))
				) : (
					<center>Нет фото</center>
				)}
			</HStack>
		</VStack>
	);
};

export default Photos;
