import dynamic from 'next/dynamic';
import { FC, Suspense, useCallback, useState } from 'react';

import { BotActions } from '~components/BotCards/BotPaymentCard/BotPaymentActions';
import { BotContentBlock } from '~components/BotCards/BotPaymentCard/BotPaymentCard.styles';
import { BotDescription } from '~components/BotCards/BotPaymentCard/BotPaymentDescription';
import { BotSubscriptionActions } from '~components/BotCards/BotPaymentCard/BotSubscriptionActions';
import { Copyright } from '~components/Copyright';
import { ToC } from '~components/ToC';
import { CheckoutReason } from '~constants/annals';
import { useCurrentBot } from '~hooks/useCurrentBot';
import { TShopBotSubscription } from '~services/api/credits/types';
import { formatBotPaymentOptions } from '~utils/payments';

import { BotFullPageCard, TBotFullPageCard } from '../BaseLayout';

export type TBotPaymentCard = TBotFullPageCard & {
	checkoutReason: CheckoutReason;
	onSuccess: () => void;
};

const PaymentModal = dynamic(
	() =>
		import('~components/Modals/PaymentModal').then((mod) => mod.PaymentModal),
	{ ssr: false }
);

export const BotPaymentCard: FC<TBotPaymentCard> = ({
	botId,
	onSuccess,
	promo,
	checkoutReason,
}) => {
	const { bot, botSuccess } = useCurrentBot({ recipientId: botId });
	const [selectedPackage, setSelectedPackage] =
		useState<TShopBotSubscription>();

	const clearSelected = useCallback(() => {
		setSelectedPackage(undefined);
	}, []);

	if (!botSuccess) {
		return null;
	}

	const isInfluencer = bot?.accountType === 'influencer';
	if (isInfluencer) {
		checkoutReason = CheckoutReason.DigitalCopy;
	}

	const conditions = formatBotPaymentOptions(
		bot?.preConditions ?? bot?.postConditions
	);

	const showSubscription =
		conditions.paymentOptionTypes.includes('subscription');

	return (
		<BotFullPageCard promo={promo} botId={botId}>
			<BotDescription
				name={bot.name}
				title={bot?.descriptions?.postconditionTitle}
				type={bot.accountType}
				interests={bot?.profile?.interests}
				description={
					bot?.descriptions?.postconditionDescription ??
					bot?.descriptions?.precondition
				}
			/>
			{showSubscription ? (
				<BotSubscriptionActions
					{...conditions}
					botUid={bot.uid}
					handleSelect={setSelectedPackage}
				/>
			) : (
				<BotActions
					{...conditions}
					botId={botId}
					onSuccess={onSuccess}
					checkoutReason={checkoutReason}
					name={bot.name}
					promo
				/>
			)}
			<BotContentBlock gap={8}>
				<ToC />
				<Copyright />
			</BotContentBlock>
			{!!selectedPackage && (
				<Suspense fallback={null}>
					{/*@ts-ignore*/}
					<PaymentModal
						item={selectedPackage}
						onSuccess={onSuccess}
						onClose={clearSelected}
						botClientId={botId}
						botName={bot.name}
						botType={bot.accountType}
						checkoutReason={checkoutReason}
					/>
				</Suspense>
			)}
		</BotFullPageCard>
	);
};
