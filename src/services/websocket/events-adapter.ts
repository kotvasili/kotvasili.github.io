import { WsEvent, WsEventPayload, WsEventType } from './types';

export const eventsAdapter = (event: WsEventPayload): WsEvent => {
	const type = (event.label || event.type) as WsEventType;
	const payload = event.payload || event.details;
	//workaround. timestamp in event from ws is incorrect
	if (event.sync && payload.timestamp) {
		payload.timestamp = +event.sync;
	}

	return { type, payload } as WsEvent;
};
