import styles from './RightSidebar.module.scss';
import { FC, ReactNode } from 'react';

import VStack from '@/components/containers/Stack/VStack/VStack';

interface RightSidebarProps {
	children: ReactNode;
}

const RightSidebar: FC<RightSidebarProps> = ({ children }) => {
	return <VStack className={styles.container}>{children}</VStack>;
};

export default RightSidebar;
