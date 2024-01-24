import { DateTime } from 'luxon';
import type { FC } from 'react';

import {
	BotFullPageCard,
	TBotFullPageCard,
} from '~components/BotCards/BaseLayout';
import { BotContentBlock } from '~components/BotCards/BotPaymentCard/BotPaymentCard.styles';
import { CancelForm } from '~components/BotCards/CancelSubscriptionsCard/CancelForm';
import { PremiumFeatures } from '~components/PremiumFeatures';
import { ToC } from '~components/ToC';
import { H1, P } from '~components/Typography';
import { TSubscriptionItemExtended } from '~services/api/subscriptions/types';

export type TBotCancelCard = TBotFullPageCard & {
	onSuccess: () => void;
	currentItem: TSubscriptionItemExtended;
};
export const CancelSubscriptionsCard: FC<TBotCancelCard> = ({
	promo,
	botId,
	currentItem,
	onSuccess,
}) => {
	const date = DateTime.fromISO(currentItem.endDate).toLocaleString(
		DateTime.DATE_MED
	);
	return (
		<BotFullPageCard
			promo={promo}
			botId={botId}
			showImage={currentItem.botUid !== 'main'}
		>
			<BotContentBlock>
				<H1>Cancel Renewal</H1>
				<P>
					Your {promo ? `${currentItem.botName} access` : 'Premium'} is active
					until <br />
					{date}
				</P>
			</BotContentBlock>
			<CancelForm currentItem={currentItem} onSuccess={onSuccess} />
			<ToC refund />
			<PremiumFeatures botId={currentItem.botId} />
		</BotFullPageCard>
	);
};
