import { useEffect, useState } from 'react';

import { useAuthState } from '@/hooks/states/useAuthState';

import { UserService } from '@/services/user.service';
import { IUser } from '@/types/users.types';


const useUserProfile = (username: string) => {
	const { currentUser } = useAuthState()
	const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false)
	const [userProfile, setUserProfile] = useState<IUser>()

	useEffect(() => {
		UserService.getUserByUsername(username).then(user => {
			if (user) {
				setIsCurrentUser(user.username === currentUser?.username)
				setUserProfile(user)
			}
		})
	}, [username, currentUser])

	return { userProfile, isCurrentUser }
}
export default useUserProfile
