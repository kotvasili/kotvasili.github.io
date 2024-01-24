import { useMediaQuery } from '@react-hookz/web';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { CloseFeed } from '~components/GiftFeed/ActionButtons/Close';
import {
	OpenFeed,
	OpenFeedMobile,
} from '~components/GiftFeed/ActionButtons/Open';
import { Gift } from '~components/GiftFeed/Gift';
import {
	ActionButtonWrapper,
	ActionButtonWrapperPosition,
	CloseFeedMobileLayout,
	Container,
	GiftFeedGrid,
	GiftFeedGridOpened,
} from '~components/GiftFeed/GiftFeed.styles';
import { CheckoutReason } from '~constants/annals';
import { useAuthContext } from '~context/auth';
import { usePayWallActionsContext, usePayWallContext } from '~context/paywall';
import { useAnnalsOpenGiftFeed } from '~hooks/annals';
import { useCurrentBot } from '~hooks/useCurrentBot';
import { useFreeGiftWatcher } from '~hooks/useFreeGiftAvailable';
import { useGetGifts } from '~hooks/useGetGifts';
import { useSendMessageMutation } from '~services/api/dialogs';
import { TGift } from '~services/api/gifts/types';
import { buildMessageFromString } from '~utils/messages';

export const GiftFeed = () => {
	const [opened, setGiftStateOpened] = useState(false);
	const { balance, hasSubscription } = usePayWallContext();
	const { openNeurons, openSubscription } = usePayWallActionsContext();
	const { id } = useAuthContext();
	const isMobile = useMediaQuery('screen and (max-width: 425px)');
	const [sendMessage] = useSendMessageMutation();
	const { query } = useRouter();
	const { recipientId } = query;
	const { bot } = useCurrentBot({ recipientId: recipientId as string });
	const [needSendGift, setNeedSendGift] = useState<TGift | undefined>();
	const gifts = useGetGifts(recipientId as string);
	const freeGift = (gifts.data || []).find((g) => g.price == 0) || { id: '' };
	const giftFeedAnnals = useAnnalsOpenGiftFeed({
		botName: bot.name,
		botClientId: bot.clientId,
	});
	useFreeGiftWatcher(recipientId as string, freeGift.id);

	const handleOnActionClick = () => {
		if (opened) {
			setGiftStateOpened(false);
		} else {
			void giftFeedAnnals();
			setGiftStateOpened(true);
		}
	};

	const sendGift = useCallback(
		(gift: TGift) => {
			void sendMessage({
				recipientId: recipientId as string,
				id,
				message: buildMessageFromString('', id, {
					meta: {
						gift: gift.id,
					},
					reference: gift.image,
				}),
			});

			setNeedSendGift(undefined);
		},
		[id, recipientId, sendMessage]
	);

	const handleOnSendGift = useCallback(
		(gift: TGift) => {
			if (balance < gift.price) {
				setNeedSendGift(gift);

				const neuronsModalConfig = {
					cost: gift.price,
					botName: bot.name,
					checkoutReason: CheckoutReason.GiftStore,
					botClientId: bot.clientId,
					title: `Add Neurons to send ${bot?.name} a gift`,
					cb: (success: boolean | undefined) => {
						if (!success) {
							setNeedSendGift(undefined);
						}
					},
				};

				if (hasSubscription) {
					return openNeurons(neuronsModalConfig)();
				}

				return openSubscription({
					cost: gift.price,
					botName: bot.name,
					checkoutReason: CheckoutReason.GiftStore,
					botClientId: bot.clientId,
					cb: (success) => {
						if (!success) {
							return openNeurons(neuronsModalConfig)();
						}
					},
				})();
			}

			sendGift(gift);
		},
		[
			balance,
			bot.clientId,
			bot.name,
			hasSubscription,
			openNeurons,
			openSubscription,
			sendGift,
		]
	);

	useEffect(() => {
		if (needSendGift) {
			if (balance >= needSendGift.price) {
				sendGift(needSendGift);
			} else {
				handleOnSendGift(needSendGift);
			}
		}
	}, [balance, handleOnSendGift, needSendGift, sendGift]);

	if ((!gifts.isLoading && gifts.isError) || !gifts.data?.length) {
		return null;
	}

	const data = opened
		? [...gifts.data]
		: gifts.data.slice(0, !isMobile ? 6 : undefined);

	return (
		<>
			{((opened && isMobile) || !isMobile) && (
				<Container>
					<GiftFeedGrid
						isMobile={!!isMobile}
						cols={data.length}
						className={opened ? GiftFeedGridOpened : ''}
					>
						{data.map((gift) => {
							return (
								<Gift key={gift.id} onPress={handleOnSendGift} gift={gift} />
							);
						})}
					</GiftFeedGrid>
					{gifts.data.length > 6 && !isMobile && (
						<ActionButtonWrapper
							onClick={handleOnActionClick}
							className={opened ? ActionButtonWrapperPosition : ''}
						>
							{opened ? <CloseFeed type="desktop" /> : <OpenFeed />}
						</ActionButtonWrapper>
					)}

					<CloseFeedMobileLayout>
						<CloseFeed onClose={handleOnActionClick} type="mobile" />
					</CloseFeedMobileLayout>
				</Container>
			)}

			{isMobile && !opened && (
				<OpenFeedMobile onClick={handleOnActionClick} gift={gifts.data[0]} />
			)}
		</>
	);
};
