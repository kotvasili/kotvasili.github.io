import { styled } from '@linaria/react';

import { withBlurBg } from '~theme/snippets';

export const BotImage = styled.div`
	width: 100%;
	max-width: 600px;
	height: 100%;
	position: relative;
	display: flex;
	flex-flow: column nowrap;
	&:before {
		position: absolute;
		content: '';
		z-index: -1;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 76%;
		height: 35%;
		border-radius: 100%;
		background: var(--blur-bg);
		filter: blur(60px);
	}
	img {
		object-fit: contain;
		object-position: bottom center;
	}
	@media screen and (max-width: 768px) {
		max-width: 100%;
		filter: brightness(0.55);
		overflow: hidden;

		img {
			object-position: top center;
			transform: scale(1.3);
			transform-origin: top center;
			flex: 1;
		}
	}
	@media screen and (max-width: 440px) {
		img {
			transform: scale(1.4);
		}
	}
`;

export const BotContent = styled.div`
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: flex-start;
	row-gap: 32px;
	width: 100%;
	max-width: 380px;
	z-index: 1;
	padding: 0 20px calc(var(--safe-bottom) + 20px);
	${withBlurBg({})};
	&:after {
		height: 80%;
		top: 10%;
	}
`;

export const CardWrapper = styled.div`
	position: relative;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
	max-width: 1440px;
	flex: 1;
	@media screen and (max-width: 768px) {
		justify-content: center;
		align-items: flex-start;
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr;
		& > div {
			grid-area: 1 / 1;
			margin: auto auto 0;
			min-height: 0;
			min-width: 0;
		}
	}

	&.promo {
		${BotImage} {
			&:before {
				display: none;
			}
		}

		${BotContent} {
			position: static;
			&:after {
				display: none;
			}
		}
	}
`;

export const PromoBlockHead = styled.div`
	position: absolute;
	top: -48px;
	left: 2%;
	z-index: 1;
	max-width: 232px;
	h1 {
		font-weight: 500;
	}
	h2 {
		margin-top: 10px;
		font-weight: 400;
	}
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const PromoBlockBottom = styled.div`
	position: absolute;
	bottom: 40px;
	left: 2%;
	z-index: 1;
	@media screen and (max-width: 768px) {
		display: none;
	}
`;
