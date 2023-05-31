'use client';

import styles from './MessengerHeader.module.scss';
import { Pages } from '@/utils/constants/pages.constants';
import { useRouter } from 'next/navigation';
import { BiArrowBack } from 'react-icons/bi';

import HStack from '@/components/containers/Stack/HStack/HStack';
import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';
import Icon from '@/components/ui/primitives/Icon/Icon';

import { useCurrentChatState } from '@/hooks/states/useCurrentChatState';

const MessengerHeader = () => {
	const { currentChat } = useCurrentChatState();
	const { replace } = useRouter();

	const handleGoBack = () => {
		replace(Pages.MESSENGER);
	};

	const handleGoToFriendProfile = () => {};

	return (
		<HStack className={styles.container}>
			<Icon icon={BiArrowBack} className={styles.arrowBack} size={28} onClick={handleGoBack} />
			<p className={styles.name}>{currentChat?.title}</p>
			<CustomImage alt={'user-avatar'} width={40} height={40} className={styles.avatar} />
		</HStack>
	);
};

export default MessengerHeader;
