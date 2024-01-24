import { Subject } from 'rxjs';

import { TShardModifiedResponse } from '~services/api/shards';

import { WsEvent } from './types';
import { WebSocketConnection } from './websocket-connection';

export class EventsInbox {
	private eventsSubject = new Subject<WsEvent>();

	events$ = this.eventsSubject.asObservable();

	private connection: WebSocketConnection | null = null;

	start(fetchUrl: () => Promise<TShardModifiedResponse | undefined>) {
		const listener = (event: WsEvent) => this.eventsSubject.next(event);
		this.connection = new WebSocketConnection(listener, fetchUrl);
		this.connection.start();
	}

	stop() {
		if (this.connection) {
			this.connection.stop();
			this.connection = null;
		}
	}
}
