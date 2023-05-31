'use client';

import { FC, useEffect, useState } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import RightSidebar from '@/components/layout/RightSidebar/RightSidebar';
import UsersList from '@/components/layout/UsersList/UsersList';
import CreatePostBlock from '@/components/ui/posts/CreatePost/CreatePostBlock';
import PostsList from '@/components/ui/posts/PostsList/PostsList';
import Loader from '@/components/ui/primitives/Loader/Loader';
import PhotoGallery from '@/components/ui/profile/PhotoGallery';
import ProfileCard from '@/components/ui/profile/ProfileCard';

import { useAuthState } from '@/hooks/states/useAuthState';

import { UserService } from '@/services/user.service';

import { IUser } from '@/types/users.types';

interface ProfileProps {
	username: string;
}

const Profile: FC<ProfileProps> = ({ username }) => {
	const [user, setUser] = useState<IUser>();
	const { currentUser } = useAuthState();
	const isCurrentUser = currentUser?.username === username;

	useEffect(() => {
		UserService.getUserByUsername(username).then(res => setUser(res));
	}, [username]);

	if (!user) return <Loader />;

	return (
		<VStack className={'gap-8 w-full'}>
			<ProfileCard isCurrentUser={isCurrentUser} userProfile={user} />
			<HStack className={'items-start lg:gap-6'}>
				<VStack className={'gap-4 w-full lg:w-[70%]'}>
					<PhotoGallery user={user} isCurrentUser={isCurrentUser} photos={user.photos.reverse()} />
					{isCurrentUser ? <CreatePostBlock /> : null}
					<PostsList filter={[user._id]} />
				</VStack>
				<RightSidebar>
					<UsersList list={user.friends} label={'Друзья'} />
				</RightSidebar>
			</HStack>
		</VStack>
	);
};

export default Profile;
