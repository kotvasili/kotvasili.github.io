import Image from 'next/image';
import React from 'react';

import {
	Container,
	FreeGift,
	GiftImage,
	PriceContainer,
	PriceText,
} from '~components/GiftFeed/Gift/Gift.styles';
import { TGift } from '~services/api/gifts/types';

type TProps = {
	gift: TGift;
	onPress: (gift: TGift) => void;
};

export const Gift = ({ onPress, gift }: TProps) => {
	const handleOnPress = () => {
		onPress(gift);
	};

	return (
		<Container onClick={handleOnPress}>
			<GiftImage>
				<Image src={gift.image} width={56} height={56} alt={gift.id} />
			</GiftImage>
			<PriceContainer>
				{!!gift.price ? (
					<>
						<PriceText size="small" weight={600}>
							{gift.price}
						</PriceText>
						<Image
							src="/img/neurons/gem-icon.png"
							width={14}
							height={14}
							alt={'gem icon'}
						/>
					</>
				) : (
					<FreeGift />
				)}
			</PriceContainer>
		</Container>
	);
};
