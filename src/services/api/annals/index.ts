import { api } from '~services/api';

export const annalsApi = api.injectEndpoints({
	endpoints: (build) => ({
		sendEvent: build.mutation<
			unknown,
			{ event: string; userId?: string; body?: { [key: string]: unknown } }
		>({
			query: ({ event, userId = 'nouser', body }) => ({
				url: `/annals/${userId}/${event}`,
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const { useSendEventMutation } = annalsApi;
