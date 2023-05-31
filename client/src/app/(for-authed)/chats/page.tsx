import Chats from '@/pages/Chats/Chats';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Мессенджер'
};

const ChatsPage = () => {
	return <Chats />;
};

export default ChatsPage;
