import { authSlice } from './auth/auth.slice';
import { combineReducers } from 'redux';

import { persistedCurrentChat } from '@/store/chats/currentChat/persist.config';
import { persistedChats } from '@/store/chats/persist.config';
import { modalSlice } from '@/store/modal/modal.slice';
import { persistedPosts } from '@/store/posts/persist-config';
import { persistedRelations } from '@/store/relations/persist.config';

export const RootReducer = combineReducers({
	auth: authSlice.reducer,
	posts: persistedPosts,
	relations: persistedRelations,
	chats: persistedChats,
	currentChat: persistedCurrentChat,
	modal: modalSlice.reducer
});
