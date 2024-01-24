export enum Events {
	OpenStore = 'begin_checkout',
	BeginCheckout = 'begin_checkout_pay_form',
	SendMsgButton = 'click-send-msg-arrow-btn',
	SendMsgKeyboard = 'click-send-msg-keyboard-return-or-enter-btn',
	ChatClickFromList = 'click-chat-chats-screen-ai',
	BackToChatList = 'click-back-arrow-chat-screen-ai',
	CopyText = 'user-copy-text',
	PasteText = 'user-paste-text',
	Onboarding = 'onboarding-steps-ai',
	OnboardingFinished = 'onboarding-finished-ai',
	GiftFeedOpened = 'ai-click-gift-btn',

	// TODO: should be removed
	// duplicate OpenStore/BeginCheckout with the reason DigitalCopy
	// k.eremeev@sdventures.com asked to leave temporary
	OpenDigitalCopySubscription = 'begin-checkout-digital-copy-chat-ai',
	BeginCheckoutDigitalCopy = 'click-activate-access-btn-paywall-digital-copy-ai',
}

export enum OnboardingStep {
	EmailConfirmation = 'email-verification-step1',
	EmailConfirmed = 'email-verification-step2',
}

export enum EmailConfirmationAction {
	OpenInbox = 'out_email',
}

export enum CheckoutReason {
	Menu = 'MENU',
	Chat = 'CHAT',
	ChatList = 'CHATLIST',
	DigitalCopy = 'CHATLIST_DIGITAL_COPY_SUBSCRIPTION',
	WatchAIPhoto = 'WATCH_AI_PHOTO',
	ListenAIAudio = 'LISTEN_AUDIO_AI',
	Subscriptions = 'MY_SUBSCRIPTIONS_LEARN_MORE',
	Sexting = 'SEXTING',
	GiftStore = 'GIFT_STORE',
}
