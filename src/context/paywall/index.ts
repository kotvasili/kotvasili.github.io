import { createContext, useContext } from 'react';

import type {
	TPaywallActionsState,
	TPaywallState,
} from '~context/paywall/types';

export const PayWallContext = createContext<TPaywallState>({
	balance: 0,
	hasSubscription: false,
	loading: true,
});

export const usePayWallContext = () => {
	const context = useContext(PayWallContext);
	if (!context) {
		throw Error('PayWall context no context Provider');
	}
	return context;
};

export const PayWallActionsContext = createContext<TPaywallActionsState>({
	openNeurons: () => () => undefined,
	openSubscription: () => () => undefined,
});

export const usePayWallActionsContext = () => {
	const context = useContext(PayWallActionsContext);
	if (!context) {
		throw Error('PayWallActions context no context Provider');
	}
	return context;
};
