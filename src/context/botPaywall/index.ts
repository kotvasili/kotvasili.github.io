import { createContext, useContext } from 'react';

import { TBotPaywallContext } from '~context/botPaywall/types';

export const BotPaywallContext = createContext<TBotPaywallContext>({
	isOpen: false,
	canSendMessages: false,
	hasBotSubscription: false,
	close: () => undefined,
	open: () => undefined,
});

export const useBotPaywallContext = () => {
	const context = useContext(BotPaywallContext);
	if (!context) {
		throw Error('BotPaywallContext context no context Provider');
	}
	return context;
};
