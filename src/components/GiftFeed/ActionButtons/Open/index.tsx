import Image from 'next/image';
import React from 'react';

import {
	FreeGift,
	Gift,
	OpenFeedComponent,
	OpenFeedMobileComponent,
} from '~components/GiftFeed/ActionButtons/Open/OpenFeed.styles';
import { TGift } from '~services/api/gifts/types';

export const OpenFeed = () => {
	return <OpenFeedComponent />;
};

type TOpenFeedMobileProps = {
	onClick: () => void;
	gift: TGift;
};

export const OpenFeedMobile = ({ onClick, gift }: TOpenFeedMobileProps) => {
	return (
		<OpenFeedMobileComponent onClick={onClick}>
			<Image src={gift.image} width={80} height={80} alt={'open feed icon'} />
			{!!gift.price ? <Gift /> : <FreeGift />}
		</OpenFeedMobileComponent>
	);
};
