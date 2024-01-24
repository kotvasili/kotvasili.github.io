import { DateTime } from 'luxon';
import { FC } from 'react';

import { BotAvatar } from '~components/BotAvatar';
import { Button } from '~components/Button';
import { PremiumFeatures } from '~components/PremiumFeatures';
import { P } from '~components/Typography';
import {
	BotHead,
	ExpiryBlock,
	PremiumText,
	Wrapper,
} from '~components/UserSettings/UserSubscriptions/SubListItem/SubscriptionItem.styles';
import { useCurrentBot } from '~hooks/useCurrentBot';
import { TSubscriptionItemExtended } from '~services/api/subscriptions/types';

export const SubscriptionListItem: FC<
	TSubscriptionItemExtended & {
		onCancel: (args: TSubscriptionItemExtended) => void;
	}
> = ({ onCancel, ...rest }) => {
	const { endDate, cancelDate, botId } = rest;
	const isCanceled = !!cancelDate;
	const date = DateTime.fromISO(endDate).toLocaleString(DateTime.DATE_MED);
	const { bot } = useCurrentBot({ recipientId: botId });
	const isInfluencer = bot.uid !== 'main';

	return (
		<Wrapper>
			{isInfluencer ? (
				<BotHead>
					<BotAvatar size={20} avatarUrl={bot.images.chatAvatarPath} />
					<P size="small" weight={700}>
						{bot.name} Access
					</P>
				</BotHead>
			) : (
				<PremiumText transform="uppercase" weight={600}>
					EVA AI Premium
				</PremiumText>
			)}
			<ExpiryBlock>
				<P transparent size="medium" weight={600}>
					{isCanceled ? 'Active until' : 'Renew date'}
				</P>
				<P weight={500} size="medium">
					{date}
				</P>
			</ExpiryBlock>
			<PremiumFeatures small botId={botId} />
			{!isCanceled ? (
				<Button
					type="secondary"
					text="Cancel Renewal"
					// @ts-ignore
					onClick={onCancel?.(rest)}
				/>
			) : null}
		</Wrapper>
	);
};
