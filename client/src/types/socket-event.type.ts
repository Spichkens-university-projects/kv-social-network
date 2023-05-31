export interface SocketEventType {
	topic: string;
	listener: (...args: any[]) => void;
}
