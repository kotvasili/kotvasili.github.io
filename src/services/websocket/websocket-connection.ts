import { destr } from 'destr';
import { BehaviorSubject, Subscription } from 'rxjs';

import { TShardModifiedResponse } from '~services/api/shards';

import { eventsAdapter } from './events-adapter';
import { Listener, WsEventPayload } from './types';

interface Disposable {
	(): void;
}

const RECONNECT_INTERVAL = 5000;

const maxRetry = 5;

type WSState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'closed';
export class WebSocketConnection {
	private timestamp: null | string = null;

	public state = new BehaviorSubject<WSState>('idle');
	state$ = this.state.asObservable();
	private wsOpenTimestamp: number = new Date().getTime();

	private isOpened = false;

	private closedByClient = false;

	private retry = 0;

	private ws: WebSocket | null = null;

	private timer: ReturnType<typeof setTimeout> | null = null;

	private disposeFallback: Disposable | null = null;
	private readonly subscriptions = new Subscription();
	private fetchUrl: (
		shard?: string
	) => Promise<TShardModifiedResponse | undefined>;

	constructor(
		private listener: Listener,
		fetchUrl: () => Promise<TShardModifiedResponse | undefined>
	) {
		this.fetchUrl = fetchUrl;
		this.addListeners();
	}
	addListeners() {
		this.state$.subscribe(this.handleState);
	}
	handleState = (state: WSState): void => {
		// eslint-disable-next-line no-console
		console.log(state, new Date());
	};
	start(shard?: string) {
		const prevState = this.state.getValue();
		if (prevState === 'connected') {
			return;
		}

		this.retry++;
		if (this.retry === 1) {
			this.state.next('connecting');
		}
		if (this.retry <= maxRetry) {
			this.handleConnect(shard);
		}
	}

	stop = () => {
		this.disposeFallback && this.disposeFallback();

		this.closeWebSocket();
		this.state.next('closed');

		// NOTE: Closing connection from client-side. No need to reconnect
		this.closedByClient = true;
	};

	private setUrl = (url: string) => {
		return this.timestamp == null ? url : `${url}?sync=${this.timestamp}`;
	};

	private reconnect(shard?: string) {
		this.state.next('reconnecting');
		this.timer && clearTimeout(this.timer);
		this.timer = setTimeout(
			() => {
				return this.start(shard);
			},
			// NOTE: In case we lost connection because of staying in background, we should not have any delay
			this.retry === 0 ? 0 : RECONNECT_INTERVAL
		);
	}

	private handleConnect = (shard?: string) => {
		void this.fetchUrl(shard)
			.catch(() => {
				this.reconnect(shard);
				return null;
			})
			.then((data) => {
				const { shard, url } = data as TShardModifiedResponse;
				if (!url) {
					this.reconnect(shard);
					return null;
				}
				const syncUrl = this.setUrl(url);

				this.ws && this.closeWebSocket();

				this.ws = new WebSocket(syncUrl);

				this.ws.onopen = () => {
					this.wsOpenTimestamp = Date.now();
					this.retry = 0;
					this.isOpened = true;
					this.state.next('connected');

					this.disposeFallback && this.disposeFallback();
				};

				this.ws.onmessage = (message) => {
					if (!message.data) {
						return;
					}

					const event: WsEventPayload = destr(message.data);
					const wsEvent = eventsAdapter(event);

					wsEvent.type && this.listener(wsEvent);

					if (event.sync) {
						this.timestamp = event.sync;
					}
				};

				this.ws.onerror = () => {
					if (this.isOpened) {
						this.closeWebSocket();
					}

					this.isOpened = false;
				};

				this.ws.onclose = (event) => {
					if (event?.reason === 'by ttl') {
						this.retry = 0;
					}
					this.isOpened && this.closeWebSocket();

					if (!this.closedByClient) {
						this.reconnect(shard);
					}

					this.closedByClient = false;
				};
			});
	};

	private closeWebSocket() {
		if (!this.ws) {
			return;
		}

		this.timer && clearTimeout(this.timer);
		this.timer = null;
		this.ws.close();
		this.ws = null;
		this.isOpened = false;
		this.state.next('closed');
	}
}
