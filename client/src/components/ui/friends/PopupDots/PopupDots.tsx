'use client';

import styles from './PopupDots.module.scss';
import { FC, ReactNode, useState } from 'react';
import { BiDotsHorizontal } from 'react-icons/bi';

import Popup from '@/components/ui/popup/Popup';
import Icon from '@/components/ui/primitives/Icon/Icon';

interface FriendItemDotsProps {
	children: ReactNode;
}

const PopupDots: FC<FriendItemDotsProps> = ({ children }) => {
	const [isPopupVisible, setIsPopupVisible] = useState(false);

	const onMouseLeave = () => setIsPopupVisible(false);
	const onMouseEnter = () => setIsPopupVisible(true);

	return (
		<div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={styles.container}>
			<Icon icon={BiDotsHorizontal} className={styles.icon} />
			<Popup onClose={onMouseLeave} isOpen={isPopupVisible} className={styles.popup}>
				{children}
			</Popup>
		</div>
	);
};

export default PopupDots;
