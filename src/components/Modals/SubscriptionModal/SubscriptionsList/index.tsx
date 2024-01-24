import type { FC, PropsWithChildren } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '~components/Button';
import { Loader } from '~components/Loader';
import { SubscriptionItem } from '~components/Modals/SubscriptionModal/SubscriptionItem';
import {
	SubItemsWrap,
	SubList,
} from '~components/Modals/SubscriptionModal/SubscriptionsList/SubscriptionList.styles';
import { GTMAnalytics } from '~services/analytics';
import { useShopQuery } from '~services/api/credits';
import type { TShopSubscription } from '~services/api/credits/types';

type SubscriptionProps = {
	title?: string;
	open: boolean;
	onSelect: (item: TShopSubscription) => void;
} & PropsWithChildren;
export const SubscriptionsList: FC<SubscriptionProps> = ({
	open,
	onSelect,
	children,
}) => {
	const [selected, setSelected] = useState(2);
	const { data, isLoading } = useShopQuery(undefined, { skip: !open });
	const items = useMemo(() => data?.subscriptions ?? [], [data?.subscriptions]);

	useEffect(() => {
		if (open) {
			setSelected(2);
		}
	}, [open]);

	useEffect(() => {
		if (items.length > 0 && open) {
			GTMAnalytics.viewSubscription(items);
		}
	}, [items, open]);

	return (
		<SubList>
			{children}
			{isLoading ? (
				<Loader size={40} />
			) : (
				<>
					<SubItemsWrap>
						{items.map((item, index) => {
							const baseMonthPay = items[0].formatted.monthPayment;
							const currMonthPay = item.formatted.monthPayment;

							const percentageDiscount = Math.round(
								((baseMonthPay - currMonthPay) / baseMonthPay) * 100
							);
							const texts: Record<number, string> = {
								0: '',
								1: `Save ${percentageDiscount}%`,
								2: `Super saver - ${percentageDiscount}%`,
							};

							return (
								<SubscriptionItem
									{...item}
									key={item.sku}
									selected={selected === index}
									onSelect={() => setSelected(index)}
									discount={texts[index]}
								/>
							);
						})}
					</SubItemsWrap>
					{items.length > 0 && (
						<Button
							onClick={() => {
								GTMAnalytics.selectItem(items[selected], selected);
								onSelect(items[selected]);
							}}
							text={'Continue'}
						/>
					)}
				</>
			)}
		</SubList>
	);
};
