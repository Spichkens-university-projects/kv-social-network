'use client';

import { useTypedSelector } from '../TypedHooks';

export const useCurrentChatState = () =>
	useTypedSelector(state => state.currentChat);
