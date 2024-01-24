import { TBotInfo } from '~services/api/user/types';

export type TMessageTarificationType =
	| undefined
	| 'free'
	| 'purchase'
	| 'subscription'
	| 'subscription-bot'
	| 'subscription_then_purchase'
	| 'subscription-bot_then_purchase';

export type TMessageTarification = {
	final: boolean;
	paid?: boolean;
	cost?: number;
	type?: TMessageTarificationType;
};

export type TMessageAttachment = {
	baseName: string;
	mediatype: string;
};

export type TMessageMetaAutomation = {
	topicId: string;
	topicName: string;
};

export type TMessageMeta = {
	tariffication: TMessageTarification;
	attachments?: TMessageAttachment[];
	auto?: boolean;
	hasAudio?: boolean;
	type?: string; //wtf is this?
	autoDelete?: Date;
	preview?: string;
	reference?: string;
	automation?: TMessageMetaAutomation;
	giftPreview?: string;
	gift?: string;
} | null;

export type TMessage = {
	id: number;
	sender: string;
	recipient: string;
	status: number;
	timestamp: number;
	type: number;
	meta: TMessageMeta;
	text: string;
	encodedText?: string;
	tag: string;
};

export type TMessageRequestBody = {
	text: string;
	tag: string;
	meta: {
		gift: string;
	} | null;
	instant: number;
	reference?: string;
};

export type TDialogMessageResponse = {
	id: number;
	'sender-id': string;
	'recipient-id': string;
	timestamp: number;
	meta: {
		attachments?: TMessageAttachment[];
		tariffication: TMessageTarification;
		preview?: string;
		Auto: boolean;
		Type: string; //wtf is this?
	} | null;
	text: string;
	tag: string;
};

export type TDialogResponse = {
	total: number;
	'user-id': string;
	'holder-id': string;
	payload: TDialogMessageResponse;
};

export type TDialogItem = {
	total: number;
	unreadCount: number;
	id?: number;
	timestamp: number;
	senderId: string;
	lastMessage: string;
	encodedLastMessage?: string;
	tarifficationType?: TMessageTarificationType;
	paid: boolean;
	cost?: number;
};

export type TDialogStateItems = {
	[key: string]: TDialogItem;
};

export type TDialogsState = {
	ids: string[];
	items: TDialogStateItems;
};

type TBotConfigImages = {
	avatarPath: string | null;
	chatAvatarPath: string | null;
	chatBackgroundPath: string | null;
	webBackgroundPath: string | null;
};
type TBotConfigAnimations = {
	idlePath: string | null;
	idleSextingPath: string | null;
	idleStartPath: string | null;
};

export type TBotAccountType = 'influencer' | 'main' | 'common';
export type TBotPromo = {
	priority: number;
} | null;

export type TBotColors = {
	main: string;
};

export type TBotTags = string[];

export type TBotConfig = {
	uid: string;
	serverId: number;
	clientId: number;
	order: number | null;
	name: string;
	images: TBotConfigImages;
	animations: TBotConfigAnimations | null;
	accountType: TBotAccountType;
	promo?: TBotPromo;
	tags?: TBotTags;
	colors?: TBotColors;
	profile?: Pick<TBotInfo, 'gender' | 'ethnicity' | 'birthday' | 'interests'>;
	descriptions?: {
		precondition?: string;
		postconditionTitle?: string;
		postconditionDescription?: string;
		profile?: string;
		status?: string;
	};
};

export type TBotConfigExtended = TBotConfig & {
	message: TDialogItem | null;
	preConditions?: TBotAvailabilityConditions;
	postConditions?: TBotAvailabilityPostConditions;
};
export type TParticipantsRawResponse = Record<string | 'main', TBotConfig>;
export type TParticipantResponseTransformed = Record<
	string,
	TBotConfigExtended
>;
export type TParticipantsResponse = {
	promoIds: number[];
	activeIds: number[];
	disabledIds: number[];
	bots: TParticipantResponseTransformed;
};
export type TBotPaymentOptionType = 'neurons' | 'level' | 'subscription';
export type TBotAvailabilityPaymentOption = {
	type: TBotPaymentOptionType;
	value: number;
};
export type TBotAvailabilityTrialOptionType = 'messages';
export type TBotAvailabilityTrialOption = {
	type: TBotAvailabilityTrialOptionType;
	value: number;
};

export type TBotPaymentType = 'purchase' | 'subscription';
export type TBotAvailabilityConditions = {
	paymentType: TBotPaymentType;
	paymentOptions: TBotAvailabilityPaymentOption[];
};

export type TBotAvailabilityPostConditions = TBotAvailabilityConditions & {
	trialOptions?: TBotAvailabilityTrialOption[];
};

export type TAvailabilityInfo = {
	availableStatus: 'available' | 'unavailable';
	botId: string;
	uid: string;
	conditions?: {
		preCondition?: TBotAvailabilityConditions;
		postCondition?: TBotAvailabilityPostConditions;
	};
};
export type TBotAvailabilityResponseRaw = {
	chatList: TAvailabilityInfo[];
};
export type TBotAvailabilityResponse = TAvailabilityInfo[];

export type TSupportedMessageTypes = 'text' | 'image' | 'audio' | 'gift';
