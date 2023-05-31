import axios from 'axios';

import { store } from '@/store/store';

export const API_SERVER: string = `http://localhost:3001/api`;

export const axiosClassic = axios.create({
	baseURL: API_SERVER,
	headers: { 'Content-Type': 'application/json' }
});

export const axiosWithToken = axios.create({
	baseURL: API_SERVER,
	headers: { 'Content-Type': 'application/json' }
});

axiosWithToken.interceptors.request.use(
	config => {
		const accessToken = store.getState().auth.accessToken;
		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`;
		}
		return config;
	},
	error => Promise.reject(error)
);
