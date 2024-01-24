import { SyntheticEvent, useCallback, useState } from 'react';

import { Button } from '~components/Button';
import { Loader } from '~components/Loader';
import { CancelSubscriptionModal } from '~components/Modals/CancelSubscriptionModal';
import { P } from '~components/Typography';
import { EmptyListItem } from '~components/UserSettings/UserSubscriptions/SubListItem/EmptyListItem';
import { RefundUrl, SupportUrl } from '~constants/links';
import { useModal } from '~hooks/useModal';
import { useSubscriptions } from '~hooks/useSubscriptions';
import { TSubscriptionItemExtended } from '~services/api/subscriptions/types';

import { SubscriptionListItem } from '../SubListItem';
import { LinksSection, List } from './SubscriptioList.styles';

export const SubscriptionList = () => {
	const { subscriptions, hasData, isSuccess, isLoading } = useSubscriptions();

	const { open, close, isOpen } = useModal();
	const [currentItem, setCurrentItem] = useState<
		TSubscriptionItemExtended | undefined
	>();

	const openCancel = useCallback(
		(args: TSubscriptionItemExtended) => (e: SyntheticEvent) => {
			setCurrentItem(args);
			e.preventDefault();
			open()();
		},
		[open]
	);

	return (
		<List>
			{isLoading ? <Loader size={75} /> : null}
			{isSuccess ? (
				<LinksSection>
					<a href={SupportUrl} target="_blank">
						<Button
							type={hasData ? 'primary' : 'secondary'}
							text="Contact Support"
							grow={1}
						/>
					</a>
					<P align="center" size="small" transparent>
						<a href={RefundUrl} target="_blank">
							Refund and Cancellation Policy
						</a>
					</P>
				</LinksSection>
			) : null}
			{isSuccess && !hasData ? <EmptyListItem /> : null}
			{hasData
				? subscriptions.map((item) => (
						<SubscriptionListItem
							{...item}
							key={item.sku}
							onCancel={openCancel}
						/>
				  ))
				: null}
			<CancelSubscriptionModal
				currentItem={currentItem ?? ({} as TSubscriptionItemExtended)}
				open={isOpen}
				onClose={close}
				locked
			/>
		</List>
	);
};
