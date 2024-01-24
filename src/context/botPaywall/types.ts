export type TBotPaywallContext = {
	canSendMessages: boolean;
	close: () => void;
	open: () => void;
	isOpen: boolean;
	hasBotSubscription: boolean;
};
