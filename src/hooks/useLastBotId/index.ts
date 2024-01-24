import { useLocalStorageValue } from '@react-hookz/web';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { useDialogs } from '~hooks/useDialogs';
import { useUserId } from '~hooks/useUserId';

export const useLastBotId = (): {
	lastBotId?: string;
	setLastBotId: (value: string) => void;
} => {
	const userId = useUserId();
	const key = `${userId}:lastBotId`;
	const { value: lastBotId, set } = useLocalStorageValue<string>(key);

	const setLastBotId = useCallback(
		(value: string) => userId && set(value),
		[set, userId]
	);

	return { lastBotId, setLastBotId };
};

export const useRouteToLastBotId = () => {
	const { lastBotId } = useLastBotId();
	const { disabledIds } = useDialogs();
	const { replace } = useRouter();

	return useCallback(() => {
		if (!lastBotId) return;

		const isDisabled = disabledIds.some((botId) => `${botId}` === lastBotId);
		if (isDisabled) return;

		void replace(`/${lastBotId}`);
	}, [disabledIds, lastBotId, replace]);
};
