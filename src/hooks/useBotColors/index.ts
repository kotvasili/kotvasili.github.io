import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';

import { useCurrentBot } from '~hooks/useCurrentBot';

import { IConversationQuery } from '../../types/pages';

export const useBotColors = () => {
	const { query } = useRouter();
	const { recipientId } = query as IConversationQuery;
	const { bot } = useCurrentBot({ recipientId });
	useLayoutEffect(() => {
		if (!bot.colors?.main) {
			document.documentElement.style.removeProperty('--bot-color-main');
		} else {
			document.documentElement.style.setProperty(
				'--bot-color-main',
				bot.colors?.main
			);
		}
	}, [bot.colors?.main]);
};
