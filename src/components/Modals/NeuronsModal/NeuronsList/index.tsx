import { useDebouncedEffect } from '@react-hookz/web';
import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '~components/Button';
import { Loader } from '~components/Loader';
import { NeuronItem } from '~components/Modals/NeuronsModal/NeuronItem';
import {
	NeuronsGrid,
	NeuronsGridWrap,
} from '~components/Modals/NeuronsModal/NeuronsList/NeuronsList.styles';
import { GTMAnalytics } from '~services/analytics';
import { useShopQuery } from '~services/api/credits';
import { TShopNeuronsPack } from '~services/api/credits/types';
import { fadeIn } from '~theme/snippets';

function pickPackage(arr: TShopNeuronsPack[], cost: number) {
	let minIndex = null;
	for (let i = 0; i < arr.length; i++) {
		if (
			arr[i].amount >= cost &&
			(minIndex === null || arr[i].amount < arr[minIndex].amount)
		) {
			minIndex = i;
		}
	}
	return minIndex ?? 1;
}

export const NeuronsList: FC<{
	open: boolean;
	onSelect: (item: TShopNeuronsPack) => void;
	requestedCost: number;
}> = ({ open, onSelect, requestedCost }) => {
	const { data, isLoading } = useShopQuery(undefined, { skip: !open });
	const items = useMemo(() => data?.neurons ?? [], [data?.neurons]);
	const [active, setActive] = useState(pickPackage(items, requestedCost));

	useEffect(() => {
		if (open) {
			setActive(pickPackage(items, requestedCost));
		}
	}, [items, open, requestedCost]);

	useDebouncedEffect(
		() => {
			if (items.length > 0 && open) {
				GTMAnalytics.viewNeurons(items);
			}
		},
		[items, open],
		200
	);

	return isLoading ? (
		<Loader size={40} />
	) : (
		<NeuronsGridWrap>
			<NeuronsGrid className={fadeIn}>
				{items.map((item, index) => {
					const url = `/img/neurons/gem${index}.png`;
					return (
						<NeuronItem
							{...item}
							key={item.sku}
							url={url}
							active={index === active}
							onClick={() => setActive(index)}
							description={index === 1 ? 'Most popular' : ''}
						/>
					);
				})}
			</NeuronsGrid>
			{items.length > 0 && (
				<Button
					onClick={() => {
						GTMAnalytics.selectItem(items[active], active);
						onSelect(items[active]);
					}}
					text={'Continue'}
				/>
			)}
		</NeuronsGridWrap>
	);
};
