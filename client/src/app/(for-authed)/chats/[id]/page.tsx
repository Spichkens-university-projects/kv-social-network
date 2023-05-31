import Messenger from '@/pages/Messenger/Messenger';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Мессенджер'
};

const MessengerPage = async () => {
	return <Messenger />;
};

export default MessengerPage;
