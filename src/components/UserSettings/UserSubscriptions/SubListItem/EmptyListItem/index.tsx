import { Button } from '~components/Button';
import { P } from '~components/Typography';
import {
	PremiumText,
	Wrapper,
} from '~components/UserSettings/UserSubscriptions/SubListItem/SubscriptionItem.styles';
import { CheckoutReason } from '~constants/annals';
import { usePayWallActionsContext } from '~context/paywall';

export const EmptyListItem = () => {
	const { openSubscription } = usePayWallActionsContext();
	return (
		<Wrapper>
			<PremiumText transform="uppercase" weight={600}>
				EVA AI Premium
			</PremiumText>
			<P>
				Get rewarded for your daily engagement and enjoy exclusive access to our
				special features
			</P>
			<Button
				onClick={openSubscription({
					checkoutReason: CheckoutReason.Subscriptions,
				})}
				text="Learn More"
			/>
		</Wrapper>
	);
};
