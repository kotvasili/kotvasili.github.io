import { env } from 'next-runtime-env';

import { api } from '~services/api';
import { TGift, TRequestGifts } from '~services/api/gifts/types';

export const giftsApi = api.injectEndpoints({
	endpoints: (build) => ({
		getGifts: build.query<TGift[], TRequestGifts>({
			query: ({ userId, botId }) => ({
				url: `ai/gifts/config/${userId}/${botId}`,
			}),
			providesTags: ['gifts'],
			transformResponse: (data: TGift[]): TGift[] => {
				return data.map((gift) => {
					return {
						...gift,
						image: (env('NEXT_PUBLIC_PUBLIC_API') || '').concat(gift.image),
						src: gift.image,
						price: Number(gift.price),
					};
				});
			},
		}),
	}),
	overrideExisting: false,
});
export const { useGetGiftsQuery } = giftsApi;
