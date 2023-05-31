import News from '@/pages/News/News';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Новости'
};

const NewsPage = ({}) => {
	return <News />;
};

export default NewsPage;
