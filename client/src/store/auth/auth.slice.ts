import { logout, refresh, signIn, signUp } from './auth.actions';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { deleteCookie } from 'cookies-next';

import { IUser } from '@/types/users.types';

export interface AuthStoreInitialState {
	currentUser: IUser | null;
	accessToken: string;
	isLoading: boolean;
}

const initialState: AuthStoreInitialState = {
	currentUser: null,
	accessToken: '',
	isLoading: false
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		restoreUser: state => {
			state.accessToken = '';
			state.currentUser = null;
			deleteCookie('refresh');
		},
		updateUser: (state, { payload }: PayloadAction<IUser>) => {
			state.currentUser = { ...payload, photos: payload.photos.reverse() };
		}
	},
	extraReducers: builder => {
		builder
			.addCase(signUp.pending, state => {
				state.isLoading = true;
			})
			.addCase(signUp.fulfilled, (state, { payload }) => {
				state.currentUser = payload.user;
				state.isLoading = false;
				state.accessToken = payload.accessToken;
			})
			.addCase(signUp.rejected, state => {
				state.currentUser = null;
				state.isLoading = false;
				state.accessToken = '';
			})
			.addCase(signIn.pending, state => {
				state.isLoading = true;
			})
			.addCase(signIn.fulfilled, (state, { payload }) => {
				state.currentUser = payload.user;
				state.isLoading = false;
				state.accessToken = payload.accessToken;
			})
			.addCase(signIn.rejected, state => {
				state.currentUser = null;
				state.isLoading = false;
				state.accessToken = '';
			})
			.addCase(logout.fulfilled, state => {
				state.currentUser = null;
				state.isLoading = false;
				state.accessToken = '';
			})
			.addCase(refresh.fulfilled, (state: AuthStoreInitialState, { payload }) => {
				state.currentUser = payload.user;
				state.isLoading = false;
				state.accessToken = payload.accessToken;
			})
			.addCase(refresh.rejected, (state: AuthStoreInitialState) => {
				state.currentUser = null;
				state.isLoading = false;
				state.accessToken = '';
			})
			.addCase(refresh.pending, state => {
				state.isLoading = true;
			});
	}
});

export const { restoreUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
