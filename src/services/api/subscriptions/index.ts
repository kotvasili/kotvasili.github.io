import { api } from '~services/api';
import {
	TSubscriptionBenefits,
	TSubscriptionCancelBody,
	TSubscriptionsResponse,
} from '~services/api/subscriptions/types';

const prefix = '/benefits';
export const subscriptionApi = api.injectEndpoints({
	endpoints: (build) => ({
		getSubscriptions: build.query<TSubscriptionsResponse, { id: string }>({
			query: ({ id }) => ({
				url: `${prefix}/${id}/subscriptions/actual`,
			}),
			providesTags: ['subscriptions'],
		}),
		getSubscriptionBenefits: build.query<
			TSubscriptionBenefits,
			{ id: string; botId: string | number }
		>({
			query: ({ id, botId }) => ({
				url: `/ai/chats/${id}/${botId}/subscription-benefits`,
			}),
		}),
		cancelSubscription: build.mutation<
			undefined,
			{ id: string; body: TSubscriptionCancelBody }
		>({
			query: ({ id, body }) => ({
				url: `${prefix}/${id}/subscriptions/cancel`,
				method: 'POST',
				body,
			}),
			async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(
						subscriptionApi.util.updateQueryData(
							'getSubscriptions',
							{ id },
							(draft) => {
								const item = draft.subscriptions.find(
									(item) => item.sku === body.sku
								);
								if (!item) return;
								item.cancelDate = item.endDate;
							}
						)
					);
				} catch {}
			},
		}),
	}),
});

export const {
	useGetSubscriptionsQuery,
	useCancelSubscriptionMutation,
	useGetSubscriptionBenefitsQuery,
} = subscriptionApi;
