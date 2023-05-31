import { persistReducer } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';

import { RelationsStoreInitialState, relationsSlice } from '@/store/relations/relations.slice';
import storage from '@/store/storage';

const persistConfig: PersistConfig<RelationsStoreInitialState> = {
	key: 'relations',
	storage,
	blacklist: ['moreOnServer', 'listToRender', 'isLoading']
};

export const persistedRelations = persistReducer(persistConfig, relationsSlice.reducer);
