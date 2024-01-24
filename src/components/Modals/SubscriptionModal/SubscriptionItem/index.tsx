import type { FC } from 'react';

import {
	ItemDiscount,
	ItemMonthly,
	ItemOuter,
	ItemPeriod,
	ItemPrice,
} from '~components/Modals/SubscriptionModal/SubscriptionItem/SubscriptionItem.styles';
import { CURRENCY_SYMBOL } from '~constants/payments';
import type { TShopSubscription } from '~services/api/credits/types';

export const SubscriptionItem: FC<
	TShopSubscription & {
		selected: boolean;
		discount: string;
		onSelect: () => void;
	}
> = ({ price, currency, selected, onSelect, formatted, discount }) => {
	const { period, monthPayment } = formatted;
	const symbol = CURRENCY_SYMBOL[currency];
	return (
		<ItemOuter selected={selected} onClick={onSelect}>
			<ItemDiscount>{discount}</ItemDiscount>
			<ItemPeriod>
				{period.months} {`month${period.months === 1 ? '' : 's'}`}
			</ItemPeriod>
			<ItemPrice>
				{symbol}
				{price}
			</ItemPrice>
			<ItemMonthly>
				{symbol}
				{monthPayment}/month
			</ItemMonthly>
		</ItemOuter>
	);
};
