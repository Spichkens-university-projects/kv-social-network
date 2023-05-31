'use client';

import { Pages } from '@/utils/constants/pages.constants';
import { hasCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

import Loader from '@/components/ui/primitives/Loader/Loader';

import { useAuthActions } from '@/hooks/actions/useAuthActions';
import { useAuthState } from '@/hooks/states/useAuthState';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const { isLoading, accessToken, currentUser } = useAuthState();
	const { replace } = useRouter();
	const { refresh } = useAuthActions();

	const isRefreshTokenInCookie = (): boolean => {
		return hasCookie('refresh');
	};

	useEffect(() => {
		if (!isRefreshTokenInCookie()) replace(Pages.LOGIN);
		else refresh();
	}, []);

	if (isLoading) return <Loader />;
	if (!isLoading && currentUser) return <>{children}</>;
	return null;
};

export default AuthProvider;
