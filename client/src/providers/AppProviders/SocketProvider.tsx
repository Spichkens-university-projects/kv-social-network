'use client';

import { ReactNode, createContext } from 'react';
import { Socket } from 'socket.io-client';

import useSocket from '@/hooks/socket/useSocket';

export const SocketContext = createContext<Socket | null>(null);

const SocketProvider = ({ children }: { children: ReactNode }) => {
	const socket = useSocket();
	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
