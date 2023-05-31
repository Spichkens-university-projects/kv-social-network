'use client';

import styles from './NavigationTab.module.scss';

import VStack from '@/components/containers/Stack/VStack/VStack';
import NavigationTabItem from '@/components/layout/LeftSidebar/NavigationTab/NavigationTabItem/NavigationTabItem';
import { navigationTabs } from '@/components/layout/LeftSidebar/NavigationTab/navigation-tabs.list';

const NavigationTab = () => {
	return (
		<VStack className={styles.container}>
			{navigationTabs.map((item, index) => (
				<NavigationTabItem item={item} key={index} />
			))}
		</VStack>
	);
};

export default NavigationTab;
