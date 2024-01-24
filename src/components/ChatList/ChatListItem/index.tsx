import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, SyntheticEvent, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { BotAvatar } from '~components/BotAvatar';
import {
	BotName,
	ChatListItemPromoBorder,
	ChatListItemWrapper,
	Content,
	gradient,
	LastMessage,
} from '~components/ChatList/ChatListItem/ChatListItem.styles';
import { Tag } from '~components/Tag';
import { useAnnalsChatClickFromList } from '~hooks/annals';
import { useHasSubscription } from '~hooks/useHasSubscription';
import { useUserId } from '~hooks/useUserId';
import { dialogsApi } from '~services/api/dialogs';
import { TBotConfigExtended } from '~services/api/dialogs/types';
import {
	formatBotPaymentOptions,
	isShowPaid,
	transformMessagePaymentType,
} from '~utils/payments';

import TickSimple from '../../../../public/assets/icons/tick-simple.svg';
import { AppDispatch } from '../../../store';

type TCardState = {
	isPromo?: boolean;
	isDisabled?: boolean;
	onClick?: (botClientId: number) => void;
};
const ChatListItem: FC<TBotConfigExtended & TCardState> = ({
	clientId,
	message,
	images,
	accountType,
	name,
	isPromo = false,
	isDisabled = false,
	tags,
	preConditions,
	postConditions,
	onClick,
}) => {
	const pathname = usePathname();

	const influencer = accountType === 'influencer';
	const hasMessage = message !== null;

	const promoClass = isPromo ? `promo` : '';
	const disabledClass = isDisabled ? 'disabled' : '';
	const isActive = pathname === `/${clientId}`;
	const activeClass = isActive ? `active` : '';
	const { options, paymentOptionTypes } =
		formatBotPaymentOptions(preConditions);
	const dispatch = useDispatch<AppDispatch>();
	const annalsChatClick = useAnnalsChatClickFromList({
		botName: name,
		botClientId: clientId,
	});

	const userId = useUserId();
	const paymentType = hasMessage
		? transformMessagePaymentType(
				message.tarifficationType,
				message.cost,
				message.paid,
				userId === message.senderId
		  )
		: [];
	const hasSubscription = useHasSubscription();
	const hasBotSubscription = !postConditions;
	const showPaid = isShowPaid(
		paymentType,
		message?.cost ?? 0,
		hasSubscription,
		hasBotSubscription,
		message?.paid ?? true
	);

	const handleClick = useCallback(
		(e: SyntheticEvent) => {
			void annalsChatClick();

			if (onClick) {
				e.preventDefault();
				onClick?.(clientId);
			}
		},
		[annalsChatClick, onClick, clientId]
	);

	useEffect(() => {
		if (isActive) {
			dispatch(
				dialogsApi.util.updateQueryData('getDialogs', undefined, (draft) => {
					const botMessage = draft[clientId].message;
					if (typeof botMessage?.unreadCount === 'number') {
						botMessage.unreadCount = 0;
					}
				})
			);
		}
	}, [clientId, dispatch, isActive, message?.timestamp]);

	return (
		<Link href={`/${isDisabled ? '' : clientId}`} passHref legacyBehavior>
			<ChatListItemWrapper
				className={`${promoClass} ${disabledClass} ${activeClass}`}
				onClick={handleClick}
			>
				<BotAvatar
					avatarUrl={images.chatAvatarPath}
					unread={message?.unreadCount}
				/>
				<Content>
					<BotName align="left" size="medium">
						{name}
						{influencer && <TickSimple />}
					</BotName>
					{paymentOptionTypes &&
					paymentOptionTypes.length > 0 &&
					!hasMessage ? (
						<LastMessage>
							{options[paymentOptionTypes[0]].textPurchaseInitial}
						</LastMessage>
					) : null}
					{hasMessage ? (
						<LastMessage>
							{showPaid ? message?.encodedLastMessage : message?.lastMessage}
						</LastMessage>
					) : null}
				</Content>
				<ChatListItemPromoBorder className={gradient} />
				{tags &&
					tags.length > 0 &&
					tags.map(
						(name) => name !== 'verified' && <Tag name={name} key={name} />
					)}
			</ChatListItemWrapper>
		</Link>
	);
};

export default ChatListItem;
