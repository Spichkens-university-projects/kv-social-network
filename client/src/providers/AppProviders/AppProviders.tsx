'use client';

import AuthProvider from '@/providers/AppProviders/AuthProvider';
import GlobalSocketEventsProvider from '@/providers/AppProviders/GlobalSocketEventsProvider';
import RelationProvider from '@/providers/AppProviders/RelationProvider';
import SocketProvider from '@/providers/AppProviders/SocketProvider';
import { FC, ReactNode } from 'react';

interface AppProvidersProps {
	children: ReactNode;
}

const AppProviders: FC<AppProvidersProps> = ({ children }) => {
	return (
		<AuthProvider>
			<SocketProvider>
				<GlobalSocketEventsProvider />
				<RelationProvider />
				{children}
			</SocketProvider>
		</AuthProvider>
	);
};

export default AppProviders;
