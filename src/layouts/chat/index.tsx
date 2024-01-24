import type { PropsWithChildren } from 'react';

import ChatList from '~components/ChatList';
import { EmailConfirmModal } from '~components/Modals/EmailConfirmModal';
import { NeuronsButton } from '~components/NeuronsButton';
import { NotificationEventListener } from '~components/NotificationEventListener';
import { CheckoutReason } from '~constants/annals';
import { AuthContextProvider } from '~context/auth/provider';
import { PayWallActionsProvider } from '~context/paywall/paywallActionsProvider';
import { PayWallContextProvider } from '~context/paywall/provider';
import { ChatAside, LayoutWrapper } from '~layouts/chat/Layout.styles';

type Props = PropsWithChildren<{
	botClientId?: number | string;
}>;

const ChatLayout = ({ botClientId, children }: Props) => {
	return (
		<>
			<NotificationEventListener />
			<AuthContextProvider>
				<LayoutWrapper>
					<PayWallContextProvider>
						<PayWallActionsProvider>
							<ChatList
								checkoutReason={CheckoutReason.ChatList}
								botClientId={botClientId}
							/>
							{children}
							<EmailConfirmModal />
							<ChatAside>
								<NeuronsButton />
							</ChatAside>
						</PayWallActionsProvider>
					</PayWallContextProvider>
				</LayoutWrapper>
			</AuthContextProvider>
		</>
	);
};

export default ChatLayout;
