import { css } from '@linaria/core';

export const BotAvatar = css`
	pointer-events: none;
	user-select: none;
	object-fit: contain;
	object-position: bottom center;
	height: 90% !important;
	top: auto !important;
	transform: scale(1.15);
	transform-origin: bottom center;
	@media screen and (min-width: 500px) {
		transform: scale(1.05);
	}
	@media screen and (min-width: 769px) {
		transform: none;
		position: fixed !important;
		right: 0 !important;
		left: auto !important;
		bottom: 0 !important;
		width: 80% !important;
		object-position: bottom right;
		z-index: 0;
	}
`;
