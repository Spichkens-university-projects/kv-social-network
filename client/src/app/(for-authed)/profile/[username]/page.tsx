import Profile from '@/pages/Profile/Profile';
import { concatName } from '@/utils/helpers/concatName';
import { Metadata } from 'next';

import { IUser } from '@/types/users.types';

interface ProfileUrlParams {
	params: {
		username: string;
	};
}

export const metadata: Metadata = {
	title: 'Профиль'
};

const getData = async (username: string) => {
	return await fetch(`http://localhost:3001/api/users/by-username/${username}`).then(res =>
		res.json()
	);
};

export const generateMetadata = async ({ params: { username } }: ProfileUrlParams) => {
	const user = await getData(username);
	return {
		title: concatName(user)
	};
};

export async function generateStaticParams() {
	const users: IUser[] = await fetch(`http://localhost:3001/api/users`).then(res => res.json());
	return users?.map(user => ({
		username: user.username
	}));
}

const ProfilePage = async ({ params: { username } }: ProfileUrlParams) => {
	return <Profile username={username} />;
};

export default ProfilePage;
