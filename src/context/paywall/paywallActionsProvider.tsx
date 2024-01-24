import dynamic from 'next/dynamic';
import {
	FC,
	PropsWithChildren,
	Suspense,
	useCallback,
	useMemo,
	useState,
} from 'react';

import { NeuronsModal } from '~components/Modals/NeuronsModal';
import { SubscriptionModal } from '~components/Modals/SubscriptionModal';
import { CheckoutReason } from '~constants/annals';
import { PayWallActionsContext } from '~context/paywall/index';
import { TNeuronsOpenConfig } from '~context/paywall/types';
import { useAnnalsOpenStore } from '~hooks/annals';
import { useModal } from '~hooks/useModal';
import { TShopItem } from '~services/api/credits/types';
import {
	Level,
	Logger,
	LoggerMessages,
	LoggerServices,
} from '~services/logger/Logger';

const PaymentModal = dynamic(
	() =>
		import('../../components/Modals/PaymentModal').then(
			(mod) => mod.PaymentModal
		),
	{ ssr: false }
);

export const PayWallActionsProvider: FC<PropsWithChildren> = ({ children }) => {
	const annalsSendOpenStore = useAnnalsOpenStore();

	const [selectedPackage, setSelectedPackage] = useState<TShopItem>();
	const [requestedCost, setRequestedCost] = useState(0);
	const [checkoutReason, setCheckoutReason] = useState<CheckoutReason>();
	const [botName, setBotName] = useState<string>();
	const [botClientId, setBotClientId] = useState<number | string>();

	const {
		isOpen: isNeuronsOpen,
		title: neuronsTitle,
		open: neuronsOpen,
		close: neuronsClose,
	} = useModal();
	const {
		isOpen: isSubscriptionOpen,
		title: subscriptionTitle,
		open: subscriptionOpen,
		close: subscriptionClose,
	} = useModal();

	const openSubscription = useCallback(
		({ checkoutReason, botName, botClientId, title, cb }: TNeuronsOpenConfig) =>
			() => {
				void annalsSendOpenStore({
					bot_UserId: botClientId,
					reason: checkoutReason,
				});

				checkoutReason && setCheckoutReason(checkoutReason);
				botName && setBotName(botName);
				botClientId && setBotClientId(botClientId);
				return subscriptionOpen({ title, cb })();
			},
		[annalsSendOpenStore, subscriptionOpen]
	);

	const openNeurons = useCallback(
		({
				cost,
				checkoutReason,
				botName,
				botClientId,
				title,
				cb,
			}: TNeuronsOpenConfig) =>
			() => {
				void annalsSendOpenStore({
					bot_UserId: botClientId,
					reason: checkoutReason,
				});

				cost && setRequestedCost(cost);
				checkoutReason && setCheckoutReason(checkoutReason);
				botName && setBotName(botName);
				botClientId && setBotClientId(botClientId);

				Logger.shared.log(
					Level.info,
					LoggerServices.PaymentService,
					LoggerMessages.BuyNeuronsScreenOpened,
					{ requiredCost: cost }
				);
				return neuronsOpen({ title, cb })();
			},
		[annalsSendOpenStore, neuronsOpen]
	);

	const closeNeurons = useCallback(
		(success: boolean) => {
			neuronsClose(success);
			setRequestedCost(0);
		},
		[neuronsClose]
	);

	const value = useMemo(
		() => ({
			openSubscription,
			openNeurons,
		}),
		[openSubscription, openNeurons]
	);

	const clearSelected = useCallback(() => {
		setSelectedPackage(undefined);
	}, []);

	const onSuccess = useCallback(() => {
		clearSelected();
		closeNeurons(true);
		subscriptionClose(true);
	}, [clearSelected, closeNeurons, subscriptionClose]);

	const closeViaCloseButton = useCallback(() => {
		subscriptionClose(false);
	}, [subscriptionClose]);

	const closeNeuronsViaCloseButton = useCallback(() => {
		closeNeurons(false);
	}, [closeNeurons]);

	return (
		<PayWallActionsContext.Provider value={value}>
			{children}
			<SubscriptionModal
				onClose={closeViaCloseButton}
				open={isSubscriptionOpen}
				botName={botName}
				title={subscriptionTitle}
				onSelect={setSelectedPackage}
				locked={false}
			/>
			<NeuronsModal
				onClose={closeNeuronsViaCloseButton}
				open={isNeuronsOpen}
				title={neuronsTitle}
				onSelect={setSelectedPackage}
				requestedCost={requestedCost}
				locked={false}
			/>
			{selectedPackage && (
				<Suspense fallback={null}>
					{/*@ts-ignore*/}
					<PaymentModal
						item={selectedPackage}
						checkoutReason={checkoutReason}
						botClientId={botClientId}
						botName={botName}
						onSuccess={onSuccess}
						onClose={clearSelected}
					/>
				</Suspense>
			)}
		</PayWallActionsContext.Provider>
	);
};
