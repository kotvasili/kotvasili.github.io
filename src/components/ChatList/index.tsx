import { Fragment, useCallback, useState } from 'react';

import {
	ChatListContainer,
	ChatListFooter,
	ChatListWrapper,
	EmailConfirmContainer,
	EmailConfirmWrapper,
} from '~components/ChatList/ChatList.styles';
import ChatListItem from '~components/ChatList/ChatListItem';
import { Copyright } from '~components/Copyright';
import { Divider } from '~components/Divider';
import { EmailConfirm } from '~components/EmailConfirm';
import { Header } from '~components/Header';
import { Loader } from '~components/Loader';
import { BotPaymentModal } from '~components/Modals/BotPaymentModal';
import { ToC } from '~components/ToC';
import { CheckoutReason } from '~constants/annals';
import { useBotColors } from '~hooks/useBotColors';
import { useDialogs } from '~hooks/useDialogs';
import { useEnableBotSubscription } from '~hooks/useEnableBotSubscription';
import { useGetLevelQuery } from '~services/api/user';

type Props = {
	checkoutReason: CheckoutReason;
	botClientId?: number | string;
};

const ChatList = ({ checkoutReason, botClientId }: Props) => {
	const { bots, promoIds, activeIds, disabledIds, isLoading } = useDialogs();
	const { data } = useGetLevelQuery();
	const [shopBotClientId, setShopBotClientId] = useState<number>();
	const hasLevel = !!data;
	useEnableBotSubscription();
	useBotColors();
	const closeShop = useCallback(() => {
		setShopBotClientId(undefined);
	}, []);

	return (
		<>
			<ChatListWrapper>
				<Header botClientId={botClientId} />
				<ChatListContainer>
					{isLoading ? <Loader /> : null}
					{promoIds.map((id) => (
						<ChatListItem {...bots[id]} key={id} isPromo />
					))}
					{activeIds.map((id) => (
						<ChatListItem {...bots[id]} key={id} />
					))}
					{disabledIds.map((id, index) => {
						const levelOption = bots[id].preConditions?.paymentOptions.find(
							({ type }) => type === 'level'
						);
						return (
							<Fragment key={id}>
								{hasLevel && index === 0 && levelOption ? (
									<Divider
										text={`Reach level ${levelOption?.value} to unlock new copy`}
										key="divider"
									/>
								) : null}
								<ChatListItem
									{...bots[id]}
									isDisabled
									onClick={setShopBotClientId}
								/>
							</Fragment>
						);
					})}
					<ChatListFooter gap={8}>
						<ToC />
						<Copyright />
					</ChatListFooter>
				</ChatListContainer>
				<EmailConfirmWrapper>
					<EmailConfirmContainer>
						<EmailConfirm withRemind />
					</EmailConfirmContainer>
				</EmailConfirmWrapper>
			</ChatListWrapper>
			<BotPaymentModal
				botClientId={shopBotClientId}
				checkoutReason={checkoutReason}
				onClose={closeShop}
				promo={false}
			/>
		</>
	);
};

export default ChatList;
