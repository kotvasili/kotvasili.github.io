import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { P } from '~components/Typography';
import { hoverable } from '~theme/snippets';

export const LastMessage = styled.p`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
	margin-top: 4px;
	color: var(--color-white-05);
	transition: color 0.2s;
`;

export const gradient = css`
	@keyframes gradient {
		0% {
			background-position: 0 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0 50%;
		}
	}

	animation: gradient 15s linear infinite;
`;

export const ChatListItemPromoBorder = styled.div`
	width: 100%;
	height: 100%;
	pointer-events: none;
	position: absolute;
	z-index: -1;
	inset: 0;
	padding: 2px;
	border-radius: 24px;
	background-size: 400% 100%;
	background-image: linear-gradient(
		17deg,
		var(--brand-common),
		transparent,
		transparent,
		var(--brand-common)
	);
	-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
	mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
	-webkit-mask-composite: xor;
	mask-composite: exclude;
	opacity: 0.6;
	will-change: background-position;
`;
export const ChatListItemWrapper = styled.a`
	padding: 4px 8px;
	position: relative;
	display: flex;
	flex-flow: row nowrap;
	gap: 16px;
	align-items: center;
	${hoverable};
	-webkit-transform: translate3d(0, 0, 0);
	min-height: 64px;
	border-radius: 24px;
	&:not(.promo) {
		${ChatListItemPromoBorder} {
			display: none;
		}
	}
	&.disabled {
		opacity: 0.5;
	}
	&.promo {
		box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
	}
	&.active {
		pointer-events: none;
		&.promo {
			${ChatListItemPromoBorder} {
				background-position: 30% 50% !important;
			}
			animation: none;
		}
	}
	&:after {
		content: '';
		display: block;
		position: absolute;
		z-index: -1;
		opacity: 1;
		left: 7px;
		top: 7px;
		width: 50px;
		height: 50px;
		filter: blur(16px);
		transition: blur 0.2s, transform 0.2s, opacity 0.2s;
		transform-origin: left center;
		background: var(--blur-bg);
		border-radius: 999px;
	}
	&:not(.active) {
		&:after {
			opacity: 0;
			transform: scaleX(2.2) translateX(10px);
			filter: blur(28px);
		}
		@media (hover: hover), (-moz-touch-enabled: 0), (pointer: fine) {
			&:hover {
				&:after {
					opacity: 1;
				}
			}
		}
	}
`;

export const BotName = styled(P)`
	font-weight: 500;
	display: flex;
	align-items: center;
	column-gap: 5px;
`;

export const Content = styled.div`
	flex: 1 0 auto;
	width: 0;
`;
