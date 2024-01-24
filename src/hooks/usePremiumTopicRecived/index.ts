import { useSubscription } from 'observable-hooks';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { api } from '~services/api';
import { TTopic } from '~services/api/topics/types';
import { wsEvents } from '~services/websocket';
import { isEventType, WsEventType } from '~services/websocket/types';

export const usePremiumTopicRecived = (topics: TTopic[]) => {
	const dispatch = useDispatch();
	const [needRefresh, serRefresh] = useState(false);

	useSubscription(wsEvents.events$, (event) => {
		if (isEventType(event, WsEventType.ChatMessageReceived)) {
			const name = event.payload?.meta?.automation?.topicName;

			if (topics.find((t) => t.Name === name)) {
				if (event.payload.meta?.reference) {
					serRefresh(true);
				}
			}

			if (needRefresh) {
				dispatch(api.util.invalidateTags(['premium-topics']));
			}
		}
	});

	useEffect(() => {
		return () => {
			dispatch(api.util.invalidateTags(['premium-topics']));
		};
	}, [dispatch]);
};
