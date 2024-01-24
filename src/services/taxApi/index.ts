import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseQueryFn } from '@reduxjs/toolkit/src/query';
import { HYDRATE } from 'next-redux-wrapper';
import { env } from 'next-runtime-env';

import { TVATRequestBodyItem, TVATResponseItem } from '~services/taxApi/types';

const taxBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
	return fetchBaseQuery({
		baseUrl: env('NEXT_PUBLIC_MOTO_URL') ?? '',
	})(args, api, extraOptions);
};

export const taxApi = createApi({
	reducerPath: 'taxApi',
	baseQuery: taxBaseQuery,
	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
			return action.payload[reducerPath];
		}
	},
	endpoints: (build) => ({
		productPricesWithVAT: build.mutation<
			TVATResponseItem[],
			TVATRequestBodyItem[]
		>({
			query: (items) => ({
				url: `/api/Price/decomposeList`,
				method: 'POST',
				body: {
					taxInfoList: items,
				},
			}),
		}),
	}),
});
