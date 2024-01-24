import { useSubscription } from 'observable-hooks';
import { useState } from 'react';

import { wsEvents } from '~services/websocket';
import { isEventType, WsEventType } from '~services/websocket/types';

export const useNeuronsReceived = (): number => {
	const [balance, setBalance] = useState(0);

	useSubscription(wsEvents.events$, (event) => {
		if (isEventType(event, WsEventType.NeuronsReceived)) {
			setBalance(event.payload.balance);
		}
	});

	return balance;
};
