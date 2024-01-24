import { memo } from 'react';

import { BotPaymentCard } from '~components/BotCards/BotPaymentCard';
import { IconButton } from '~components/IconButton';
import { Modal } from '~components/Modals/Base';
import { BotPaymentModalContainer } from '~components/Modals/BotPaymentModal/BotPaymentModal.styles';
import { CheckoutReason } from '~constants/annals';

import Close from '../../../../public/assets/icons/close.svg';
import Waves from '../../../../public/assets/Waves.svg';

type Props = {
	checkoutReason: CheckoutReason;
	botClientId?: string | number;
	promo: boolean;
	onClose: () => void;
};

export const BotPaymentModal = memo<Props>(
	({ checkoutReason, botClientId = '', promo, onClose }) => {
		return (
			<Modal open={!!botClientId} onClose={onClose} className="fullpage" locked>
				<BotPaymentModalContainer promo={promo}>
					<IconButton onClick={onClose}>
						<Close />
					</IconButton>
					<BotPaymentCard
						botId={botClientId.toString()}
						onSuccess={onClose}
						promo={promo}
						checkoutReason={checkoutReason}
					/>
					{promo ? <Waves /> : null}
				</BotPaymentModalContainer>
			</Modal>
		);
	}
);
BotPaymentModal.displayName = 'BotPaymentModal';
