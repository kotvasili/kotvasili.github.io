import Image from 'next/image';
import type { FC } from 'react';

import {
	BaseText,
	ImgContainer,
	NeuronImg,
	NeuronItemOuter,
	Price,
} from '~components/Modals/NeuronsModal/NeuronItem/NeuronItem.styles';
import { DiscountBadge } from '~components/Typography';
import { CURRENCY_SYMBOL } from '~constants/payments';
import type { TShopNeuronsPack } from '~services/api/credits/types';
import { formatCash } from '~utils/payments';

export const NeuronItem: FC<
	TShopNeuronsPack & {
		url: string;
		description: string;
		active: boolean;
		onClick: () => void;
	}
> = ({ amount, currency, price, url, active, onClick, description }) => {
	const symbol = CURRENCY_SYMBOL[currency];
	return (
		<NeuronItemOuter onClick={onClick} active={active}>
			<DiscountBadge>{description}</DiscountBadge>
			<ImgContainer>
				<Image
					src={url}
					width={108}
					height={80}
					alt={''}
					quality={100}
					className={NeuronImg}
				/>
				<Image
					src={url}
					width={108}
					height={80}
					alt={''}
					quality={100}
					className={NeuronImg}
				/>
			</ImgContainer>
			<BaseText>
				{formatCash(amount)}
				<br /> Neurons
			</BaseText>
			<Price>
				{symbol}
				{price}
			</Price>
		</NeuronItemOuter>
	);
};
