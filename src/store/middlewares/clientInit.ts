import { createListenerMiddleware } from '@reduxjs/toolkit';

import { GTMAnalytics } from '~services/analytics';
import { authApi } from '~services/api/auth';
import { shardsApi, TShardModifiedResponse } from '~services/api/shards';
import { wsEvents } from '~services/websocket';

import { RootState } from '../index';
export const clientInit = createListenerMiddleware();

// when on client - start global init
clientInit.startListening({
	matcher: authApi.endpoints.authenticate.matchFulfilled,
	effect: (action, listenerApi) => {
		if (typeof window === 'undefined') {
			return;
		}
		const {
			auth: {
				info: { id },
			},
		} = listenerApi.getState() as RootState;
		GTMAnalytics.setUserId(id);

		listenerApi.unsubscribe();
		const wsUrlFetcher = async (
			shard?: string
		): Promise<TShardModifiedResponse | undefined> => {
			const { data } = await listenerApi.dispatch(
				shardsApi.endpoints.getShard.initiate(
					{
						id,
						params: shard ? { exclude: shard } : undefined,
					},
					{ forceRefetch: true }
				)
			);
			return data;
		};

		wsEvents.start(wsUrlFetcher);
	},
});
