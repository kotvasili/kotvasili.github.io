import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authApi, TAuthUserInfo } from '~services/api/auth';

import { RootState } from '../index';
import { hydrate } from '../utils/hydrate';
import { LOGOUT } from '../utils/logout';

type AuthState = {
	isAuthorized: boolean;
	token: string;
	info: TAuthUserInfo;
};
const initialState: AuthState = {
	isAuthorized: false,
	token: '',
	info: {
		id: '',
		email: '',
	},
};
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		saveToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(LOGOUT, () => initialState)
			.addCase(hydrate, (state, action) => {
				state.token = action.payload.auth.token;
				return state;
			})
			.addMatcher(
				authApi.endpoints.authenticate.matchFulfilled,
				(state, action) => {
					state.isAuthorized = true;
					state.info.id = action.payload.id;
					state.info.email = action.payload.email;
				}
			);
	},
});
const userAuthInfo = (state: RootState) => state.auth.info;
const tokenInfo = (state: RootState) => state.auth.token;
export const getUserId = createSelector(userAuthInfo, (info) => info.id);
export const getToken = createSelector(tokenInfo, (token) => token);
export const { saveToken } = authSlice.actions;
export default authSlice.reducer;
