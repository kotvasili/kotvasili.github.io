import { PropsWithChildren, useMemo } from 'react';

import { BotPaymentModal } from '~components/Modals/BotPaymentModal';
import { CheckoutReason } from '~constants/annals';
import { BotPaywallContext } from '~context/botPaywall/index';
import { useBotPaywall } from '~hooks/useBotPaywall';
import { useCurrentBot } from '~hooks/useCurrentBot';

type Props = PropsWithChildren<{
	recipientId: string;
	messagesLength: number;
	checkoutReason: CheckoutReason;
}>;

export const BotPayWallContextProvider = ({
	children,
	recipientId,
	messagesLength,
	checkoutReason,
}: Props) => {
	const { bot, botLoading } = useCurrentBot({ recipientId });
	const { isOpen, canSendMessages, close, open } = useBotPaywall(
		bot,
		messagesLength
	);
	const hasBotSubscription = useMemo(
		() => !bot?.postConditions,
		[bot?.postConditions]
	);
	return (
		<BotPaywallContext.Provider
			value={{ isOpen, canSendMessages, close, open, hasBotSubscription }}
		>
			{children}
			{botLoading ? null : (
				<BotPaymentModal
					botClientId={isOpen ? recipientId : void 0}
					checkoutReason={checkoutReason}
					onClose={close}
					promo
				/>
			)}
		</BotPaywallContext.Provider>
	);
};
