import { PREMIUM_TOPIC_STORAGE_KEY } from '~constants/topics';
import { api } from '~services/api';
import { merge } from '~utils/merge';
import { loadFromStorage, saveToStorage } from '~utils/storage';

import { TTopic } from './types';

export const topicsApi = api.injectEndpoints({
	endpoints: (build) => ({
		getTopics: build.query<TTopic[], { userId: string; botId: string }>({
			query: ({ userId, botId }) => ({
				url: `/ai/users/${userId}/${botId}/topics`,
			}),
			providesTags: (result, error, { botId }) => [
				{ type: 'topics' as const, id: botId },
			],
		}),
		getPremiumTopics: build.query<TTopic[], { userId: string; botId: string }>({
			query: ({ userId, botId }) => ({
				url: `/ai/users/${userId}/${botId}/premium-topics`,
			}),
			transformResponse: (response: TTopic[]): TTopic[] => {
				if (response && Array.isArray(response) && response.length) {
					const topics = loadFromStorage<TTopic[]>(
						PREMIUM_TOPIC_STORAGE_KEY,
						[]
					);
					const saveCandidate = merge(
						topics,
						response,
						(a, b) => a === b
					) as TTopic[];

					if (saveCandidate.length) {
						saveToStorage<TTopic[]>(PREMIUM_TOPIC_STORAGE_KEY, saveCandidate);
					} else {
						saveToStorage<TTopic[]>(PREMIUM_TOPIC_STORAGE_KEY, response);
					}
				}

				return response;
			},
			providesTags: ['premium-topics'],
		}),
		initiateTopic: build.mutation<
			undefined,
			{ userId: string; botId: string; topicId: string }
		>({
			query: ({ userId, botId, topicId }) => ({
				url: `/ai/users/${userId}/${botId}/initiate-topic/${topicId}`,
				method: 'POST',
				body: {},
			}),
		}),
	}),
});

export const {
	useGetTopicsQuery,
	useGetPremiumTopicsQuery,
	useInitiateTopicMutation,
} = topicsApi;
