'use client';

import styles from './profile-card/ProfleCard.module.scss';
import { Pages } from '@/utils/constants/pages.constants';
import { concatPath } from '@/utils/helpers/concatPath';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';
import Button from '@/components/ui/primitives/buttons/SubmitButton/Button';

import { IUser } from '@/types/users.types';

interface PhotoGalleryProps {
	user: IUser;
	isCurrentUser: boolean;
	photos: string[];
}

const PhotoGallery: FC<PhotoGalleryProps> = ({ isCurrentUser, photos, user }) => {
	const { replace } = useRouter();
	return (
		<VStack className={styles.photoGallery}>
			{photos.length ? (
				<div className={'grid grid-cols-3 gap-4'}>
					{photos.slice(0, 3).map(photoUrl => (
						<CustomImage
							src={photoUrl}
							key={photoUrl}
							alt={'photo'}
							width={400}
							height={400}
							className={styles.galleryItem}
						/>
					))}
				</div>
			) : (
				<center>Пока нет фото</center>
			)}
			<HStack className={'items-center  gap-4'}>
				{isCurrentUser ? (
					<Button variant={'secondary'} className={'w-full'}>
						Загрузить фото
					</Button>
				) : null}

				<Button
					variant={'secondary'}
					className={'w-full'}
					onClick={() => replace(concatPath(Pages.PHOTOS, user.username))}
				>
					Показать все
				</Button>
			</HStack>
		</VStack>
	);
};

export default PhotoGallery;
