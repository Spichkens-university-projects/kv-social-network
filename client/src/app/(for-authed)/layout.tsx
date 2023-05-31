import AppProviders from '@/providers/AppProviders/AppProviders';
import { ReactNode } from 'react';

import Layout from '@/components/layout/Layout/Layout';

const AppLayout = ({ children }: { children: ReactNode }) => {
	return (
		<AppProviders>
			<Layout>{children}</Layout>
		</AppProviders>
	);
};

export default AppLayout;
