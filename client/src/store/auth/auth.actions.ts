'use client';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from 'cookies-next';
import toast from 'react-hot-toast';

import { AuthService } from '@/services/auth.service';

import { IAuthResponse, LoginInputs, RegisterInputs } from '@/types/auth.types';

export const signUp = createAsyncThunk<IAuthResponse, RegisterInputs>(
	'/auth/Register',
	async ({ email, name, surname, password, username }, thunkAPI) => {
		try {
			const response = await AuthService.signUp({
				email,
				password,
				name,
				surname,
				username
			});
			setCookie('refresh', response.refreshToken, { maxAge: 31536000 });
			return response;
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e);
		}
	}
);

export const signIn = createAsyncThunk<IAuthResponse, LoginInputs>(
	'/auth/Login',
	async ({ email, password }, thunkAPI) => {
		try {
			const response = await AuthService.signIn({ email, password });
			setCookie('refresh', response.refreshToken, { maxAge: 31536000 });
			return response;
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e);
		}
	}
);

export const refresh = createAsyncThunk<IAuthResponse, void>(
	'/auth/refresh',
	async (_, thunkAPI) => {
		try {
			const response = await AuthService.refresh();
			setCookie('refresh', response.refreshToken, { maxAge: 31536000 });
			return response;
		} catch (e: any) {
			toast.error('Не авторизован');
			return thunkAPI.rejectWithValue(e);
		}
	}
);

export const logout = createAsyncThunk('auth/logout', async () => {
	deleteCookie('refresh');
	return;
});
