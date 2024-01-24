import { createListenerMiddleware } from '@reduxjs/toolkit';

import { creditsApi } from '~services/api/credits';
import { dialogsApi } from '~services/api/dialogs';
import { userApi } from '~services/api/user';
import { Logger } from '~services/logger/Logger';

import { RootState } from '../index';

export const userData = createListenerMiddleware();

userData.startListening({
	matcher: dialogsApi.endpoints.getDialogs.matchFulfilled,
	effect: (_, listenerApi) => {
		const id = (listenerApi.getState() as RootState).auth.info.id;
		Logger.shared.updateUserId(id);
		void listenerApi.dispatch(userApi.endpoints.botInfo.initiate({ id }));
		void listenerApi.dispatch(userApi.endpoints.getLevel.initiate());
	},
});

userData.startListening({
	matcher: creditsApi.endpoints.buyBot.matchFulfilled,
	effect: (_, listenerApi) => {
		void listenerApi.dispatch(
			dialogsApi.endpoints.getBotsAvailability.initiate(undefined, {
				forceRefetch: true,
			})
		);
	},
});
