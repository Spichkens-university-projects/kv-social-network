'use client';

import styles from './LeftSidebar.module.scss';

import VStack from '@/components/containers/Stack/VStack/VStack';
import NavigationTab from '@/components/layout/LeftSidebar/NavigationTab/NavigationTab';

import { useAuthState } from '@/hooks/states/useAuthState';

const LeftSidebar = () => {
	const { currentUser } = useAuthState();
	return (
		<VStack className={styles.container}>
			<NavigationTab />
			<div>{currentUser?.name}</div>
		</VStack>
	);
};

export default LeftSidebar;
