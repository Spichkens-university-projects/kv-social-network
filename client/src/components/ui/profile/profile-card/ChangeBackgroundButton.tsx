'use client';

import styles from './ProfleCard.module.scss';
import { uploadHelper } from '@/utils/helpers/upload-file.helper';
import { ChangeEvent } from 'react';
import { BiPencil } from 'react-icons/bi';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import Icon from '@/components/ui/primitives/Icon/Icon';
import AttachmentButton from '@/components/ui/primitives/buttons/AttachmentButton/AttachmentButton';

import { useTypedDispatch } from '@/hooks/TypedHooks';

import { UserService } from '@/services/user.service';

import { updateUser } from '@/store/auth/auth.slice';

import { IFile } from '@/types/files.types';

const ChangeBackgroundButton = ({ isVisible }: { isVisible: boolean }) => {
	const dispatch = useTypedDispatch();

	const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
		await uploadHelper(event, `/profile-backgrounds`, updateUserAfterChangingBackground);
	};

	const updateUserAfterChangingBackground = (file: IFile) => {
		UserService.updateUser({ profileBackground: file.url }).then(response => {
			dispatch(updateUser(response));
		});
	};

	return isVisible ? (
		<VStack className={styles.changeBackgroundButton}>
			<AttachmentButton onChange={onChangeFile}>
				<HStack className={'gap-2 items-center'}>
					<Icon icon={BiPencil} color={'white'} />
					<p className={'text-white'}>Изменить обложку</p>
				</HStack>
			</AttachmentButton>
		</VStack>
	) : null;
};
export default ChangeBackgroundButton;
