import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {
	TypedUseSelectorHook,
	useSelector as rawUseSelector,
} from 'react-redux';

import { api } from '~services/api';
import { taxApi } from '~services/taxApi';

import authSlice from '../store/auth/authSlice';
import emailConfirmSlice from './email-confirm';
import { clientInit } from './middlewares/clientInit';
import { apiErrorLogger } from './middlewares/error';
import { wsEventListener } from './middlewares/eventListener';
import { userData } from './middlewares/userData';

export const store = () =>
	configureStore({
		reducer: {
			[api.reducerPath]: api.reducer,
			[taxApi.reducerPath]: taxApi.reducer,
			auth: authSlice,
			emailConfirm: emailConfirmSlice,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(
				api.middleware,
				taxApi.middleware,
				apiErrorLogger,
				clientInit.middleware,
				wsEventListener.middleware,
				userData.middleware
			),
		devTools: process.env.NODE_ENV !== 'production',
	});

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
export const wrappedStore = createWrapper<AppStore>(store, {
	debug: false,
	// debug: process.env.NODE_ENV === 'development',
});
