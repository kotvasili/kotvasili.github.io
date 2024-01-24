import Cookies from 'cookies';
import { GetServerSidePropsContext } from 'next';

import {
	AUTH_TOKEN_EXPIRY,
	AUTH_TOKEN_NAME,
	IS_AUTHORIZED_COOKIE_NAME,
} from '~constants/token';
import { getHost, isHostLocal, replacePrefixInHost } from '~utils/host';

import { AppStore } from '../../store';
import { saveToken } from '../../store/auth/authSlice';

export default class ServerTokenHandler {
	private readonly queryToken: string | undefined;
	private readonly cookieToken: string | undefined;
	private cookies: Cookies;
	private readonly host: string;
	private readonly isLocal: boolean;
	private readonly isTestEnv: boolean;
	store: AppStore;
	constructor({ req, res, query }: GetServerSidePropsContext, store: AppStore) {
		const token = (query.auth || query.token) as string;
		this.host = getHost();
		this.isLocal = isHostLocal(this.host);
		this.isTestEnv = this.host.includes('npstage');
		this.queryToken = token;
		this.cookies = new Cookies(req, res);
		this.cookieToken = this.cookies.get(AUTH_TOKEN_NAME);
		this.store = store;
		this.init();
	}
	private init() {
		if (!!this.queryToken) {
			return this.saveToken(this.queryToken);
		}
		//refresh expiry date on existing token
		if (!!this.cookieToken) {
			return this.saveToken(this.cookieToken);
		}
	}
	public getRedirectResult() {
		const destination = this.isLocal
			? '/404'
			: `${this.host.replace('app.', '')}`;
		const redirectResponse = {
			redirect: {
				permanent: false,
				destination,
			},
		};
		if (!this.queryToken && !this.cookieToken) {
			const expires = new Date();
			expires.setDate(expires.getDate() - 1);
			this.cookies.set(IS_AUTHORIZED_COOKIE_NAME, null, {
				domain: replacePrefixInHost(this.host, this.isLocal),
				expires,
			});
			return redirectResponse;
		}
		//temp
		// const savedToken = this.store.getState().auth.token;
		// if (!savedToken) {
		// 	return redirectResponse;
		// }
		//
		// try {
		// 	const { data } = await this.store.dispatch(authenticate.initiate());
		// 	await Promise.all(this.store.dispatch(getRunningQueriesThunk()));
		// 	if (!data) {
		// 		return redirectResponse;
		// 	}
		// } catch {
		// 	return redirectResponse;
		// }
		//
		// const isAuthSuccessful = this.store.getState().auth.isAuthorized;

		// if (!isAuthSuccessful) {
		// 	return redirectResponse;
		// }
		return {
			props: {},
		};
	}
	private saveToken(token: string) {
		this.store.dispatch(saveToken(token));

		this.cookies.set(AUTH_TOKEN_NAME, token, {
			httpOnly: !this.isLocal && !this.isTestEnv,
			domain: replacePrefixInHost(this.host, this.isLocal),
			expires: this.expiryDate,
		});
		this.cookies.set(IS_AUTHORIZED_COOKIE_NAME, 'true', {
			domain: replacePrefixInHost(this.host, this.isLocal),
			expires: this.expiryDate,
			httpOnly: false,
		});
	}
	private get expiryDate() {
		const date = new Date();
		date.setTime(date.getTime() + AUTH_TOKEN_EXPIRY);
		return date;
	}
}
