'use client';

import { FC, useState } from 'react';

import VStack from '@/components/containers/Stack/VStack/VStack';
import ChangeBackgroundButton from '@/components/ui/profile/profile-card/ChangeBackgroundButton';
import UserBackgroundImage from '@/components/ui/profile/profile-card/UserBackgroundImage';
import UserInfoGroup from '@/components/ui/profile/profile-card/UserInfoGroup';

import { IUser } from '@/types/users.types';

interface ProfileCardProps {
	userProfile: IUser;
	isCurrentUser: boolean;
}

const ProfileCard: FC<ProfileCardProps> = ({ isCurrentUser, userProfile }) => {
	const [isProfileBackgroundHovered, setIsProfileBackgroundHovered] = useState<boolean>(false);
	return (
		<VStack
			className={'relative'}
			onMouseEnter={() => setIsProfileBackgroundHovered(true)}
			onMouseLeave={() => setIsProfileBackgroundHovered(false)}
		>
			<UserBackgroundImage src={userProfile.profileBackground} />
			<ChangeBackgroundButton isVisible={isProfileBackgroundHovered} />
			<UserInfoGroup user={userProfile} isCurrentUser={isCurrentUser} />
		</VStack>
	);
};

export default ProfileCard;
