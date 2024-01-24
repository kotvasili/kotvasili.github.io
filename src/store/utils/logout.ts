import { createAction } from '@reduxjs/toolkit';

export const LOGOUT = 'auth/logout';
export const TOKEN = 'auth/token';

export const logout = createAction<void>(LOGOUT);
export const token = createAction<string>(TOKEN);
