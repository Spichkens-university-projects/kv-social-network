'use client';

import styles from './NavigationTabItem.module.scss';
import { Pages } from '@/utils/constants/pages.constants';
import { concatPath } from '@/utils/helpers/concatPath';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import { INavigationTab } from '@/components/layout/LeftSidebar/NavigationTab/navigation-tabs.list';
import CurrentPageIndicator from '@/components/ui/primitives/CurrentPageIndicator/CurrentPageIndicator';
import DotCounter from '@/components/ui/primitives/DotCounter/DotCounter';
import Icon from '@/components/ui/primitives/Icon/Icon';

import { useAuthState } from '@/hooks/states/useAuthState';
import { useRelationsState } from '@/hooks/states/useRelationsState';

interface NavigationTabItemProps {
	item: INavigationTab;
}

const NavigationTabItem: FC<NavigationTabItemProps> = ({ item: { icon, label, link } }) => {
	const [modifiedLink, setModifiedLink] = useState('');
	const { subscribers } = useRelationsState();
	const { currentUser } = useAuthState();

	const pathname = usePathname();
	const isCurrentPage = pathname?.includes(link);

	useEffect(() => {
		if (currentUser) {
			if (link === Pages.PROFILE) setModifiedLink(concatPath(Pages.PROFILE, currentUser.username));
			else if (link === Pages.PHOTOS)
				setModifiedLink(concatPath(Pages.PHOTOS, currentUser.username));
			else setModifiedLink(link);
		}
	}, []);

	return (
		<Link href={modifiedLink}>
			<HStack className={styles.container}>
				<Icon icon={icon} size={18} />
				<span className={styles.label}>{label}</span>
				{/* Если текущая страница, то показываем индикатор */}
				{isCurrentPage ? <CurrentPageIndicator /> : null}
				{label === 'Друзья' && subscribers.length ? (
					<DotCounter number={subscribers.length} />
				) : null}
			</HStack>
		</Link>
	);
};

export default NavigationTabItem;
