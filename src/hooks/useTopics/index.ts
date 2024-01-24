import { useCallback, useState } from 'react';

import { Toaster } from '~components/Toaster';
import {
	INITIATE_TOPIC_TIMEOUT,
	PREMIUM_TOPIC_STORAGE_KEY,
} from '~constants/topics';
import { useUserId } from '~hooks/useUserId';
import {
	useGetPremiumTopicsQuery,
	useGetTopicsQuery,
	useInitiateTopicMutation,
} from '~services/api/topics';
import { TTopic } from '~services/api/topics/types';
import { loadFromStorage } from '~utils/storage';

export const useTopics = (botId: string): TTopic[] => {
	const userId = useUserId();
	const { data = [] } = useGetTopicsQuery({ userId, botId });
	return data;
};

export const usePremiumTopics = (
	botId: string
): {
	premiumTopics: TTopic[];
	cache: TTopic[];
} => {
	const userId = useUserId();
	const { data = [] } = useGetPremiumTopicsQuery({ userId, botId });
	const dataFromStorage = loadFromStorage<TTopic[]>(
		PREMIUM_TOPIC_STORAGE_KEY,
		[]
	);

	return {
		premiumTopics: data,
		cache: dataFromStorage,
	};
};

export const useInitiateTopic = (
	botId: string
): [(topicId: string) => Promise<void>, string | undefined] => {
	const userId = useUserId();
	const [initiateTopic] = useInitiateTopicMutation();
	const [activeTopicId, setActiveTopicId] = useState<string>();

	const initiate = useCallback(
		async (topicId: string) => {
			setActiveTopicId(topicId);

			try {
				await initiateTopic({ userId, botId, topicId });
				setTimeout(() => setActiveTopicId(undefined), INITIATE_TOPIC_TIMEOUT);
			} catch {
				setActiveTopicId(undefined);
				Toaster.showError({
					text: 'Sorry, something went wrong. Please, try again.',
				});
			}
		},
		[botId, initiateTopic, userId]
	);

	return [initiate, activeTopicId];
};
