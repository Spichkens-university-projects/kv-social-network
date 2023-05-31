import styles from './Layout.module.scss';
import { FC, ReactNode } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import LeftSidebar from '@/components/layout/LeftSidebar/LeftSidebar';
import Navbar from '@/components/layout/Navbar/Navbar';

interface LayoutProps {
	children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<Navbar />
			<HStack className={styles.main}>
				<LeftSidebar />
				<HStack className={styles.horContainer}>{children}</HStack>
			</HStack>
		</>
	);
};

export default Layout;
