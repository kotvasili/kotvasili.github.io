import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useGetDialogsQuery } from '~services/api/dialogs';
import { TParticipantsResponse } from '~services/api/dialogs/types';
import { sortParticipants } from '~utils/messages';

export const useDialogs = (): TParticipantsResponse & {
	isLoading: boolean;
} => {
	const [initialRedirect, setInitialRedirect] = useState(false);
	const { data, isSuccess, isLoading } = useGetDialogsQuery();
	const { pathname, push } = useRouter();
	const formattedDialogs = sortParticipants(data);

	useEffect(() => {
		if (isSuccess && !initialRedirect) {
			if (pathname !== '/') {
				setInitialRedirect(true);
				return;
			}
			const mainBot = Object.values(formattedDialogs.bots).find(
				({ uid }) => uid === 'main'
			);
			if (!mainBot) {
				return;
			}
			const mainBotMessage = mainBot?.message;
			if (!mainBotMessage?.total || mainBotMessage?.total < 1) {
				void push(`/${mainBot.clientId}`);
				setInitialRedirect(true);
			}
		}
	}, [
		formattedDialogs.activeIds.length,
		formattedDialogs.bots,
		initialRedirect,
		isSuccess,
		pathname,
		push,
	]);

	if (!isSuccess) {
		return {
			promoIds: [],
			activeIds: [],
			disabledIds: [],
			bots: {},
			isLoading,
		};
	}

	return { ...formattedDialogs, isLoading };
};
