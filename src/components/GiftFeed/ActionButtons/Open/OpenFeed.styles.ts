import { styled } from '@linaria/react';
import { JSX } from 'react/jsx-runtime';

import Free from '../../../../../public/assets/icons/freeGiftText.svg';
import GiftText from '../../../../../public/assets/icons/giftText.svg';
import More from '../../../../../public/assets/icons/moreGifts.svg';

export const OpenFeedComponent = styled(More)<JSX.IntrinsicElements['svg']>`
	grid-area: btn;
	align-self: center;
	justify-self: center;
	transition: filter 0.2s, transform 0.1s;
	color: var(--color-white);

	@media (hover: hover), (-moz-touch-enabled: 0), (pointer: fine) {
		&:hover {
			filter: drop-shadow(2px 2px 8px var(--color-white-07));
		}
	}

	@media screen and (max-width: 425px) {
		display: none;
	}

	@media (hover: hover) {
		&:hover {
			transform: scale(1.2);
		}
	}
`;

// TODO возможно в месте использования стоит создавать контейнер и стилить его а не тут
export const OpenFeedMobileComponent = styled.div`
	display: none;
	position: absolute;
	right: 0;
	top: calc(56 * 2px);
	z-index: 2;

	@media screen and (max-width: 425px) {
		display: block;
	}
`;

export const FreeGift = styled(Free)<JSX.IntrinsicElements['svg']>`
	position: absolute;
	bottom: -15px;
	display: none;
	left: 50%;
	transform: translate(-50%);

	@media screen and (max-width: 425px) {
		display: block;
	}
`;

export const Gift = styled(GiftText)<JSX.IntrinsicElements['svg']>`
	position: absolute;
	bottom: 0px;
	display: none;
	left: 50%;
	transform: translate(-50%);

	@media screen and (max-width: 425px) {
		display: block;
	}
`;
