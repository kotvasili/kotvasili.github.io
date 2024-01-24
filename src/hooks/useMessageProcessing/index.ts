import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { CheckoutReason } from '~constants/annals';
import { useBotPaywallContext } from '~context/botPaywall';
import { usePayWallActionsContext, usePayWallContext } from '~context/paywall';
import { useCurrentBot } from '~hooks/useCurrentBot';
import { useBuyMessageMutation } from '~services/api/dialogs';
import { TSupportedMessageTypes } from '~services/api/dialogs/types';
import { isShowPaid } from '~utils/payments';

import { IConversationQuery } from '../../types/pages';

const paywallTexting = {
	text: {
		neurons: 'Add neurons to view romantic messages',
		subscription: 'Upgrade to access Adult sexting',
	},
	image: {
		neurons: 'Add neurons to view images',
		subscription: 'Upgrade to access Images',
	},
	audio: {
		neurons: 'Add neurons to listen messages',
		subscription: 'Upgrade to listen messages',
	},
	gift: {
		neurons: 'Add neurons to view images',
		subscription: 'Upgrade to access Images',
	},
};

export const useMessageProcessing = (
	paymentType: string[],
	messageContentType: TSupportedMessageTypes,
	isPaid: boolean,
	cost: number,
	userId: string,
	messageId: number,
	botId: string
): { showPaid: boolean; showPrice?: boolean; action?: () => void } => {
	const { query } = useRouter();
	const { openSubscription, openNeurons } = usePayWallActionsContext();
	const { balance, hasSubscription } = usePayWallContext();
	const { open: openBotModal, hasBotSubscription } = useBotPaywallContext();
	const { recipientId } = query as IConversationQuery;
	const { bot } = useCurrentBot({ recipientId: botId });
	const [buyMessage] = useBuyMessageMutation();
	const showPaid = isShowPaid(
		paymentType,
		cost,
		hasSubscription,
		hasBotSubscription,
		isPaid
	);

	const buy = useCallback(
		() =>
			buyMessage({
				recipientId,
				id: userId,
				messageId,
			}),
		[buyMessage, messageId, recipientId, userId]
	);

	const hasEnoughNeurons = balance >= cost;
	const checkoutReason =
		messageContentType === 'text'
			? CheckoutReason.Sexting
			: CheckoutReason.WatchAIPhoto;

	const buyCallBack = useCallback(() => {
		if (hasEnoughNeurons) {
			return void buy();
		} else {
			return messageContentType === 'text' && !hasSubscription
				? openSubscription({
						//sexting requires to show subscription before neurons
						title: paywallTexting[messageContentType].subscription,
						checkoutReason,
						botClientId: botId,
						cb: (success) => {
							if (!success) {
								openNeurons({
									title: paywallTexting[messageContentType].neurons,
									checkoutReason,
									botClientId: botId,
								})();
							}
						},
				  })()
				: openNeurons({
						title: paywallTexting[messageContentType].neurons,
						checkoutReason,
						botClientId: botId,
				  })();
		}
	}, [
		hasEnoughNeurons,
		buy,
		messageContentType,
		hasSubscription,
		openSubscription,
		checkoutReason,
		botId,
		openNeurons,
	]);

	const onClick = useCallback(() => {
		if (paymentType.includes('subscription-bot')) {
			if (!hasBotSubscription) {
				return openBotModal();
			}
			if (paymentType.includes('purchase')) {
				return buyCallBack();
			}
		}
		if (paymentType.includes('subscription')) {
			if (!hasSubscription) {
				return openSubscription({
					title: paywallTexting[messageContentType].subscription,
					botName: bot.name,
					checkoutReason,
					botClientId: botId,
				})();
			}
			if (paymentType.includes('purchase')) {
				return buyCallBack();
			}
		}
		if (paymentType.includes('purchase')) {
			return buyCallBack();
		}
		return () => false;
	}, [
		paymentType,
		hasBotSubscription,
		openBotModal,
		buyCallBack,
		hasSubscription,
		openSubscription,
		messageContentType,
		bot.name,
		checkoutReason,
		botId,
	]);

	if (paymentType.includes('subscription')) {
		return {
			showPaid,
			action: onClick,
			showPrice: hasSubscription,
		};
	}
	if (paymentType.includes('subscription-bot')) {
		return {
			showPaid,
			action: onClick,
			showPrice: hasBotSubscription,
		};
	}

	if (paymentType.includes('purchase')) {
		return {
			showPaid,
			action: onClick,
		};
	}

	return {
		showPaid,
	};
};
