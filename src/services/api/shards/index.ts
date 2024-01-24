import { env } from 'next-runtime-env';

import { api } from '~services/api';

const prefix = '/shards';

type TShardResponse = {
	shard: string;
	key: string;
	ttl: number;
};
export type TShardModifiedResponse = TShardResponse & {
	url: string;
};

export const shardsApi = api.injectEndpoints({
	endpoints: (build) => ({
		getShard: build.query<
			TShardModifiedResponse,
			{ id: string; params: Record<string, string> | undefined }
		>({
			query: ({ id, params }) => ({
				url: `${prefix}/${id}`,
				params,
			}),
			transformResponse: ({
				shard,
				ttl,
				key,
			}: TShardResponse): TShardModifiedResponse => {
				const apiUrl = env('NEXT_PUBLIC_PUBLIC_API') ?? '';
				const base = apiUrl
					.replace('https', 'wss')
					.replace('api', `rt${shard}`);
				const url = `${base.endsWith('/') ? base : `${base}/`}${key}`;
				return { url, ttl, shard, key };
			},
		}),
	}),
});

export const { useGetShardQuery } = shardsApi;
