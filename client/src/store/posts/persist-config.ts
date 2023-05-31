import { persistReducer } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';

import { PostsStoreInitialState, postSlice } from '@/store/posts/post.slice';
import storage from '@/store/storage';

const persistConfig: PersistConfig<PostsStoreInitialState> = {
	key: 'posts',
	storage,
	blacklist: ['moreOnServer', 'posts']
};

export const persistedPosts = persistReducer(persistConfig, postSlice.reducer);
