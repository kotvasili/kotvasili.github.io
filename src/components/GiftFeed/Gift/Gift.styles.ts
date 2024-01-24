import { styled } from '@linaria/react';

import { P } from '~components/Typography';
import { hoverable, withBlurBg } from '~theme/snippets';

import Free from '../../../../public/assets/icons/freeGiftText.svg';

export const PriceContainer = styled.div`
	opacity: 0;
	line-height: 14px;
	display: flex;
	justify-content: center;
	position: absolute;
	bottom: 20px;
	transition: opacity 0.1s, transform 0.15s;
	@media screen and (max-width: 425px) {
		opacity: 1;
		transform: translateY(10px);
		bottom: 10px;
	}
`;

export const GiftImage = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	transition: transform 0.25s;
	${withBlurBg({ blur: 16, opacity: false })};

	&:after {
		width: 60%;
		left: 20%;
		top: 12%;
		height: 120%;
		opacity: 0;
		transition: opacity 0.2s;
	}

	@media screen and (max-width: 425px) {
		width: 72px;
		height: 72px;
	}
`;

export const Container = styled.div`
	scroll-snap-align: start;
	scroll-snap-stop: normal;
	${hoverable};
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	min-height: 90px;
	position: relative;

	@media (hover: hover) {
		&:hover {
			${GiftImage} {
				transform: scale(1.2) translate(0, -14px);
				&:after {
					opacity: 1;
				}
			}
		}

		&:hover ${PriceContainer} {
			opacity: 1;
			transform: translateY(10px);
		}
	}
`;

export const PriceText = styled(P)`
	margin-right: 4px;
`;

export const FreeGift = styled(Free)<JSX.IntrinsicElements['svg']>``;
