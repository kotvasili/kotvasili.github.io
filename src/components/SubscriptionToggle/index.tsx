import {
	SubToggleInner,
	SubToggleOuter,
} from '~components/SubscriptionToggle/SubscriptionToggle.styles';
import { CheckoutReason } from '~constants/annals';
import { usePayWallActionsContext, usePayWallContext } from '~context/paywall';

type Props = {
	checkoutReason: CheckoutReason;
	botClientId?: number | string;
};

export const SubscriptionToggle = ({ checkoutReason, botClientId }: Props) => {
	const { openSubscription } = usePayWallActionsContext();
	const { hasSubscription } = usePayWallContext();
	return !hasSubscription ? (
		<SubToggleOuter
			onClick={openSubscription({ checkoutReason, botClientId })}
			className={hasSubscription ? 'enabled' : ''}
			enabled={hasSubscription}
		>
			<SubToggleInner />
		</SubToggleOuter>
	) : null;
};
