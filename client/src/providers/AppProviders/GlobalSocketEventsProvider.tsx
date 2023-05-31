'use client';

import { SocketContext } from '@/providers/AppProviders/SocketProvider';
import { useContext } from 'react';

import useGlobalSocketEvents from '@/hooks/socket/useGlobalSocketEvents';

const GlobalSocketEventsProvider = () => {
	const socket = useContext(SocketContext);
	useGlobalSocketEvents(socket);
	return null;
};

export default GlobalSocketEventsProvider;
