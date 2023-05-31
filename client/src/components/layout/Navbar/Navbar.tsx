'use client';

import styles from './Navbar.module.scss';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import Popup from '@/components/ui/popup/Popup';
import PopupItem from '@/components/ui/popup/PopupItem/PopupItem';
import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';
import Logo from '@/components/ui/primitives/Logo/Logo';
import SearchField from '@/components/ui/primitives/SearchField/SearchField';

import { useAuthActions } from '@/hooks/actions/useAuthActions';
import { useAuthState } from '@/hooks/states/useAuthState';

const ThemeSwitcher = dynamic(
	() => import('@/components/ui/primitives/ThemeSwitcher/ThemeSwitcher'),
	{
		ssr: false,
		loading: () => <div className={'p-3'}></div>
	}
);

const Navbar = () => {
	const { currentUser } = useAuthState();
	const { logout } = useAuthActions();
	const [isAvatarFunctionsPopupOpen, setIsAvatarFunctionsPopupOpen] = useState<boolean>(false);

	const closeAvatarFunctionsModal = () => {
		setIsAvatarFunctionsPopupOpen(false);
	};
	const openAvatarFunctionsModal = () => {
		setIsAvatarFunctionsPopupOpen(true);
	};

	return (
		<HStack className={styles.navbar}>
			<HStack className={styles.navContainer}>
				<Logo />
				<HStack className={styles.rightSide}>
					<SearchField />
					<ThemeSwitcher />
					<CustomImage
						alt={'user-avatar'}
						width={100}
						height={100}
						className={styles.avatar}
						onClick={openAvatarFunctionsModal}
						src={currentUser?.avatar}
					/>
					<Popup
						onClose={closeAvatarFunctionsModal}
						isOpen={isAvatarFunctionsPopupOpen}
						className={'top-[50px] right-0'}
					>
						<PopupItem color={'#E60023'} label={'Выйти'} action={logout} />
					</Popup>
				</HStack>
			</HStack>
		</HStack>
	);
};

export default Navbar;
