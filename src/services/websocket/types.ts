import { TMessage } from '~services/api/dialogs/types';

export type WsEventPayload = {
	label: string;
	type: string;
	payload: Record<string, string | number>;
	details: Record<string, string | number>;
	sync: string;
};

export enum WsEventType {
	ChatMessageReceived = 'message:message:v2',
	NeuronsOrSubscriptionBought = 'event.credits.mall.receipt.exchanged',
	BalanceChanged = 'account:credits',
	NeuronsReceived = 'event.credits.mall.exchanged',
	UserTagSet = 'event.users.tags.set',
	UserTagUnset = 'event.users.tags.unset',
	LevelChanged = 'event.users.experience.updated..ai',
	ChatBecomeAvailable = 'event.ai.chats.bot.available.became',
	ChatBecomeUnavailable = 'event.ai.chats.bot.unavailable.became',
	// DailyCoinsReceived = 'dailycoins.received',
	// SubscriptionChanged = 'tariffication.invites.changed',
	// UserStartTyping = 'ci:event.user.typing.started',
	// UserEndTyping = 'event.user.typing.ended',
	// MessageDeleted = 'event.dialogs.message.removed',
}

export type TCreditsChangedEvent = {
	balance: number;
};

export type TTagChangeEvent = {
	tag: string;
};

export type TPaymentProcessedEvent = {
	amount: number;
	autoRefill?: {
		enable: boolean;
	};
	meta: {
		subscription: boolean;
		description: string;
	};
};
export type TLevelChangedEvent = {
	userId: string;
	current: {
		currentPoints: number;
		nextLevelPoints: number;
		level: number;
	};
	changes: {
		experienceChanged: number;
		levelChanged: number;
		levelChangedMessage?: string;
		reason: {
			messageTag: string;
		};
	};
};

export type TChatAvailabilityChangedEvent = {
	userId: string;
	botId: string;
	botUid: string;
};

export type WsEvent =
	| { type: WsEventType.ChatMessageReceived; payload: TMessage }
	| { type: WsEventType.BalanceChanged; payload: TCreditsChangedEvent }
	| { type: WsEventType.NeuronsReceived; payload: TCreditsChangedEvent }
	| { type: WsEventType.UserTagSet; payload: TTagChangeEvent }
	| { type: WsEventType.UserTagUnset; payload: TTagChangeEvent }
	| {
			type: WsEventType.NeuronsOrSubscriptionBought;
			payload: TPaymentProcessedEvent;
	  }
	| { type: WsEventType.LevelChanged; payload: TLevelChangedEvent }
	| {
			type: WsEventType.ChatBecomeAvailable;
			payload: TChatAvailabilityChangedEvent;
	  }
	| {
			type: WsEventType.ChatBecomeUnavailable;
			payload: TChatAvailabilityChangedEvent;
	  };

export function isEventType<T extends WsEventType>(
	event: WsEvent,
	...eventTypes: T[]
): event is Extract<WsEvent, { type: T }> {
	return eventTypes.some((eventType) => eventType === event.type);
}

export type Listener = (wsEvent: WsEvent) => void;
