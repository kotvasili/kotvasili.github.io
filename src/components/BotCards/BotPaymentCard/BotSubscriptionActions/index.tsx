import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
	CardContainer,
	CardGrid,
	CardGridWrapper,
	CardHeader,
	DiscountBadge,
	MonthPayment,
	PeriodDescription,
	PeriodText,
	PeriodWrapper,
} from '~components/BotCards/BotPaymentCard/BotSubscriptionActions/BotSubscriptionActions.styles';
import { Button } from '~components/Button';
import { Loader } from '~components/Loader';
import { CURRENCY_SYMBOL } from '~constants/payments';
import { GTMAnalytics } from '~services/analytics';
import { useShopQuery } from '~services/api/credits';
import { TShopBotSubscription } from '~services/api/credits/types';
import { TBotPaymentOptionsFormatted } from '~utils/payments';

export const BotSubscriptionActions: FC<
	TBotPaymentOptionsFormatted & {
		handleSelect: (item: TShopBotSubscription) => void;
		botUid: string;
	}
> = ({ handleSelect, botUid }) => {
	const {
		data: botProductData,
		isLoading: botProductsLoading,
		isSuccess,
	} = useShopQuery(undefined, {
		skip: false,
	});

	const availableProductsForPurchase = useMemo(() => {
		return botProductData?.botSubscriptions[botUid.replace('-', '')] || [];
	}, [botProductData?.botSubscriptions, botUid]);

	return (
		<CardGridWrapper>
			{botProductsLoading ? <Loader size={25} /> : null}
			{availableProductsForPurchase.length > 0 && isSuccess ? (
				<CardList
					items={availableProductsForPurchase}
					handleSelect={handleSelect}
				></CardList>
			) : null}
		</CardGridWrapper>
	);
};

type TBotSubList = {
	items: TShopBotSubscription[];
	handleSelect: (item: TShopBotSubscription) => void;
};
export const CardList: FC<TBotSubList> = ({ items, handleSelect }) => {
	const [selectedItem, setSelectedItem] = useState<TShopBotSubscription>(
		items[Math.floor(items.length / 2)]
	);

	const onClick = useCallback(
		(product: TShopBotSubscription) => {
			if (product.sku === selectedItem?.sku) return;
			setSelectedItem(product);
		},
		[selectedItem?.sku]
	);

	return (
		<>
			<CardGrid>
				{items.map((it) => {
					return (
						<Card
							key={it.sku}
							product={it}
							isSelected={selectedItem === it}
							hasTag={it.sku.includes('3m')}
							onClick={onClick}
						/>
					);
				})}
			</CardGrid>
			{items.length > 0 && (
				<Button
					onClick={() => {
						if (selectedItem) {
							GTMAnalytics.selectItem(
								selectedItem,
								items.findIndex((it) => {
									return it.sku === selectedItem.sku;
								})
							);
							handleSelect(selectedItem);
						}
					}}
					text={`Get access for ${selectedItem?.formatted.period.months} month${
						selectedItem?.formatted.period.months === 1 ? '' : 's'
					}`}
				/>
			)}
		</>
	);
};

type TBotSubCardProps = {
	product: TShopBotSubscription;
	isSelected: boolean;
	hasTag: boolean;
	onClick: (index: TShopBotSubscription) => void;
};
const Card: FC<TBotSubCardProps> = ({
	product,
	isSelected,
	hasTag,
	onClick,
}) => {
	const { formatted, currency } = product;
	const symbol = CURRENCY_SYMBOL[currency];
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const updateMousePosition = (ev: MouseEvent) => {
			if (!ref.current) return;
			const rect = ref.current.getBoundingClientRect();
			const x = ev.clientX - rect.left;
			const y = ev.clientY - rect.top;
			ref.current.style.setProperty('--x', `${x}px`);
			ref.current.style.setProperty('--y', `${y}px`);
		};
		const currentElement = ref.current;
		if (currentElement) {
			currentElement.addEventListener('mousemove', updateMousePosition, {
				passive: true,
			});
		}
		return () => {
			if (currentElement) {
				currentElement.removeEventListener('mousemove', updateMousePosition);
			}
		};
	}, []);

	return (
		<CardContainer
			ref={ref}
			active={isSelected}
			key={product.sku}
			onClick={() => onClick(product)}
			className={isSelected ? 'active' : ''}
		>
			{hasTag ? <DiscountBadge>POPULAR</DiscountBadge> : null}
			<PeriodWrapper>
				<PeriodText>{formatted.period.months}</PeriodText>
				<PeriodDescription size="small" transform="uppercase" weight={700}>
					{formatted.period.months === 1 ? 'Month' : 'Months'}
				</PeriodDescription>
			</PeriodWrapper>
			<PeriodWrapper>
				<CardHeader weight={600} size="medium">
					{symbol}
					{product.price}
				</CardHeader>
				<MonthPayment size="xsmall" weight={500}>
					{symbol}
					{formatted.monthPayment}/month
				</MonthPayment>
			</PeriodWrapper>
		</CardContainer>
	);
};
