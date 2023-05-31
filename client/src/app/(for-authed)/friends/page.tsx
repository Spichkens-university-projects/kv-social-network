import Friends from '@/pages/Friends/Friends';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Друзья'
};

const FriendsPage = ({}) => {
	return <Friends />;
};

export default FriendsPage;
