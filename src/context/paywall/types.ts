import { CheckoutReason } from '~constants/annals';
import { TModalOpenConfig } from '~hooks/useModal';

export type TPaywallState = {
	balance: number;
	hasSubscription: boolean;
	loading: boolean;
};
export type TNeuronsOpenConfig = TModalOpenConfig & {
	cost?: number;
	botName?: string;
	checkoutReason: CheckoutReason;
	botClientId?: number | string;
};
export type TPaywallActionsState = {
	openSubscription: (arg: TNeuronsOpenConfig) => () => void;
	openNeurons: (arg: TNeuronsOpenConfig) => () => void;
};
