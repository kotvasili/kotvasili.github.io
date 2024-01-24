import type { FC } from 'react';

import { IconButton } from '~components/IconButton';
import { SubscriptionDialogContent } from '~components/Modals/SubscriptionModal/SubscriptionModal.styles';
import { SubscriptionsList } from '~components/Modals/SubscriptionModal/SubscriptionsList';
import type { TModalProps } from '~components/Modals/types';
import { PremiumFeatures } from '~components/PremiumFeatures';
import { ToC } from '~components/ToC';
import { H1, P } from '~components/Typography';
import type { TShopSubscription } from '~services/api/credits/types';
import { useGetDialogsQuery } from '~services/api/dialogs';

import Close from '../../../../public/assets/icons/close.svg';
import { Modal } from '../Base';

export const SubscriptionModal: FC<
	TModalProps & {
		title?: string;
		botName?: string;
		onSelect: (item: TShopSubscription) => void;
	}
> = ({
	open,
	locked,
	onClose,
	title = 'Get all Premium features',
	onSelect,
	botName,
}) => {
	const { mainBotId } = useGetDialogsQuery(undefined, {
		selectFromResult: ({ data = {} }) => {
			const mainBotId = Object.values(data).find(
				(item) => item.uid === 'main'
			)?.clientId;
			return { mainBotId };
		},
	});
	return (
		<Modal open={open} locked={locked} onClose={onClose} className="fullpage">
			<SubscriptionDialogContent>
				<IconButton onClick={onClose}>
					<Close />
				</IconButton>
				<SubscriptionsList onSelect={onSelect} open={open}>
					<H1>{title}</H1>
				</SubscriptionsList>
				<ToC refund />
				<PremiumFeatures botId={mainBotId} botName={botName} />
				<P size="small">
					This membership will autorenew each month until cancelled by you.
				</P>
			</SubscriptionDialogContent>
		</Modal>
	);
};
