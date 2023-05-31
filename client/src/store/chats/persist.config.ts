import { persistReducer } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';

import { ChatStoreInitialState, chatSlice } from '@/store/chats/chat.slice';
import storage from '@/store/storage';

const persistConfig: PersistConfig<ChatStoreInitialState> = {
	key: 'chats',
	storage,
	blacklist: ['moreOnServer', 'dialogs', 'groups', 'isLoading']
};

export const persistedChats = persistReducer(persistConfig, chatSlice.reducer);
