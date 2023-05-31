import { configureStore } from '@reduxjs/toolkit';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore
} from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';

import { RootReducer } from '@/store/root-reducer';
import storage from '@/store/storage';

const persistConfig: PersistConfig<any> = {
	key: 'root',
	storage,
	blacklist: ['auth', 'chats', 'currentChat', 'posts']
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const makeStore = () =>
	configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware: any) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
				}
			})
	});

export const store = makeStore();
export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof RootReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
