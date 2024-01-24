import type { FetchArgs } from '@reduxjs/toolkit/query/react';
import {
	createApi,
	fetchBaseQuery,
	FetchBaseQueryError,
	retry,
} from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { env } from 'next-runtime-env';

import { removeToken } from '~utils/token';

import { RootState } from '../../store';
import { logout } from '../../store/utils/logout';

const retryBaseWithAuth = retry(
	async (args: string | FetchArgs, api, extraOptions) => {
		const result = await fetchBaseQuery({
			baseUrl: env('NEXT_PUBLIC_PUBLIC_API') ?? 'https://api.ifriend.ai',
			prepareHeaders: (headers, { getState }) => {
				const storeToken = (getState() as RootState).auth.token;
				if (storeToken) {
					headers.set('authorization', `Token token="${storeToken}"`);
				}
				return headers;
			},
		})(args, api, extraOptions);
		// cancel retries immediately if unauthorized,
		if (result.error?.status === 401) {
			await removeToken();
			api.dispatch(logout());
			if (typeof window !== undefined) {
				window.location.replace(window.location.origin.replace('app.', ''));
			}
			retry.fail(result.error);
		}

		return result;
	},
	{
		retryCondition: (
			err: FetchBaseQueryError,
			_: unknown,
			extraArgs: { attempt: number; baseQueryApi: { endpoint: string } }
		) => {
			if (
				extraArgs.attempt > 2 ||
				extraArgs?.baseQueryApi?.endpoint === 'authenticate'
			) {
				return false;
			}
			if (typeof err.status === 'string') {
				return false;
			}
			return err.status === 429 || err.status > 500;
		},
	}
);

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
	reducerPath: 'api',
	/**
	 * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
	 */
	baseQuery: retryBaseWithAuth,
	/**
	 * Tag types must be defined in the original API definition
	 * for any tags that would be provided by injected endpoints
	 */
	tagTypes: [
		'ai',
		'users',
		'auth',
		'shards',
		'conversation',
		'topics',
		'gifts',
		'subscriptions',
		'premium-topics',
	],
	/**
	 * This api has endpoints injected in adjacent files,
	 * which is why no endpoints are shown below.
	 * If you want all endpoints defined in the same file, they could be included here instead
	 */
	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
			return action.payload[reducerPath];
		}
	},
	endpoints: () => ({}),
});
