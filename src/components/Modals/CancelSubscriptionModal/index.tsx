import { CSSProperties, FC } from 'react';

import { IconButton } from '~components/IconButton';
import { Modal } from '~components/Modals/Base';
import { BotPaymentModalContainer } from '~components/Modals/BotPaymentModal/BotPaymentModal.styles';
import { TModalProps } from '~components/Modals/types';
import { useCurrentBot } from '~hooks/useCurrentBot';
import { TSubscriptionItemExtended } from '~services/api/subscriptions/types';

import Close from '../../../../public/assets/icons/close.svg';
import Waves from '../../../../public/assets/Waves.svg';
import { CancelSubscriptionsCard } from '../../BotCards/CancelSubscriptionsCard';
export interface MyCustomCSS extends CSSProperties {
	'--bot-color-main': string;
}
export const CancelSubscriptionModal: FC<
	TModalProps & { currentItem: TSubscriptionItemExtended }
> = ({ open, onClose, locked, currentItem }) => {
	const promo = currentItem.botUid !== 'main';
	const { bot } = useCurrentBot({ recipientId: currentItem.botId });

	return (
		<Modal
			open={open}
			locked={locked}
			onClose={onClose}
			className="fullpage"
			style={{ '--bot-color-main': bot?.colors?.main } as MyCustomCSS}
		>
			<BotPaymentModalContainer promo={promo}>
				<IconButton onClick={onClose}>
					<Close />
				</IconButton>
				<CancelSubscriptionsCard
					currentItem={currentItem}
					botId={currentItem.botId}
					promo={promo}
					onSuccess={onClose}
				/>
				{promo ? <Waves /> : null}
			</BotPaymentModalContainer>
		</Modal>
	);
};
