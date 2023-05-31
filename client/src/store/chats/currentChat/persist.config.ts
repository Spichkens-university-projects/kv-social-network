import { persistReducer } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';

import {
	ChatStoreInitialState,
	currentChatSlice
} from '@/store/chats/currentChat/currentChat';
import storage from '@/store/storage';

const persistConfig: PersistConfig<ChatStoreInitialState> = {
	key: 'currentChat',
	storage,
	blacklist: ['messages', 'moreOnServer']
};

export const persistedCurrentChat = persistReducer(
	persistConfig,
	currentChatSlice.reducer
);
