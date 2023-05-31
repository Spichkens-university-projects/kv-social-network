import Photos from '@/pages/Photos/Photos';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Фото'
};

interface ProfileUrlParams {
	params: {
		username: string;
	};
}

const PhotosPage = async ({ params: { username } }: ProfileUrlParams) => {
	return <Photos username={username} />;
};

export default PhotosPage;
