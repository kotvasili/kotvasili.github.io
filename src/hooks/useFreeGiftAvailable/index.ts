import { useSubscription } from 'observable-hooks';
import { useDispatch } from 'react-redux';

import { api } from '~services/api';
import { wsEvents } from '~services/websocket';
import { isEventType, WsEventType } from '~services/websocket/types';

import { AppDispatch } from '../../store';

export const useFreeGiftWatcher = (botId: string, freeGiftId: string) => {
	const dispatch = useDispatch<AppDispatch>();

	useSubscription(wsEvents.events$, (event) => {
		if (!botId || !freeGiftId) return;

		if (isEventType(event, WsEventType.ChatMessageReceived)) {
			const { meta, recipient } = event.payload;
			if (meta?.gift === freeGiftId && recipient === botId) {
				dispatch(api.util.invalidateTags(['gifts']));
			}
		}
	});
};
