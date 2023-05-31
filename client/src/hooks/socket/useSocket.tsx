import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const SOCKET_SERVER = `http://localhost:3001`;

const useSocket = () => {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const newSocket = io(SOCKET_SERVER, {
			transports: ['websocket']
		});
		setSocket(newSocket);

		return () => {
			newSocket.off();
			newSocket.disconnect();
		};
	}, []);

	return socket;
};

export default useSocket;
