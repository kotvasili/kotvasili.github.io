import { styled } from '@linaria/react';

import { BaseFullContainer } from '~components/Modals/Base/Base.styles';

export const BotPaymentModalContainer = styled(BaseFullContainer)<{
	promo?: boolean;
}>`
	--bot-card-bg: linear-gradient(
			249deg,
			transparent 2.49%,
			rgb(from var(--bot-color-main) r g b / 60%) 100%
		),
		var(--color-black);
	background: ${({ promo = false }) =>
		promo ? 'var(--bot-card-bg)' : 'var(--main-bg)'};
	@media screen and (max-width: 768px) {
		background: ${({ promo = false }) =>
			promo ? 'var(--color-black)' : 'var(--main-bg)'};
	}
	& > svg {
		position: absolute;
		left: -10%;
		top: 0;
		z-index: -2;
		overflow: hidden;
		width: 110%;
		bottom: 0;
		right: 0;
		height: inherit;
		height: -moz-available;
		height: -webkit-fill-available;
		color: var(--bot-color-main);
		pointer-events: none;
		display: ${({ promo = false }) => (promo ? 'block' : 'none')};
		-webkit-mask-image: linear-gradient(
			to left,
			transparent 20%,
			rgba(0, 0, 0, 1)
		);
		path {
			transform: scale(1.6);
		}
		@keyframes depthAnimation {
			from {
				opacity: 1;
			}
			30% {
				opacity: 1;
			}
			50% {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}
		path {
			transform-origin: center center;
			will-change: opacity;
			animation-timing-function: cubic-bezier(0.36, 0.11, 0.89, 0.32);
			animation-duration: 3s;
			animation-iteration-count: infinite;
			animation-name: depthAnimation;
			opacity: 1;
		}
		.w1 {
			animation-delay: 1.65s;
		}
		.w2 {
			animation-delay: 1.5s;
		}
		.w3 {
			animation-delay: 1.35s;
		}
		.w4 {
			animation-delay: 1.2s;
		}
		.w5 {
			animation-delay: 1.05s;
		}
		.w6 {
			animation-delay: 0.9s;
		}
		.w7 {
			animation-delay: 0.75s;
		}
		.w8 {
			animation-delay: 0.6s;
		}
		.w9 {
			animation-delay: 0.45s;
		}
		.w10 {
			animation-delay: 0.3s;
		}
		.w11 {
			animation-delay: 0.15s;
		}
		.w12 {
		}
	}
`;
