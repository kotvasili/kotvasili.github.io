import { styled } from '@linaria/react';

import { P } from '~components/Typography';
import { coverDiv, hoverable } from '~theme/snippets';

export const CardContainer = styled.div<{ active: boolean }>`
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	position: relative;
	flex: 1;
	max-width: 115px;
	${hoverable};
	row-gap: 12px;
	border-radius: 15px;
	padding: 14px 8px 24px;
	transition: transform 0.2s;
	will-change: background;
	background: radial-gradient(
			var(--size-x) var(--size-y) at var(--x) var(--y),
			rgb(from var(--bot-color-main) r g b / 60%) 0%,
			rgb(from var(--bot-color-main) r g b / 0%) 100%
		),
		var(--card-bg);
	backdrop-filter: blur(12.5px);

	--card-bg: rgba(3, 3, 5, 0.6);
	--text-color: var(--color-white-07);
	--x: 83.13%;
	--y: 89.04%;
	--size-x: 65.23%;
	--size-y: 69.94%;

	&:before,
	&:after {
		content: '';
		${coverDiv};
		border-radius: 15px;
		z-index: -2;
		transition: opacity 0.2s;
		pointer-events: none;
		border: 2px solid #ffffff1a;
	}
	&:before {
		z-index: -1;
		opacity: 1;
	}
	&:after {
		box-shadow: 0 0 30px 0 rgb(from var(--bot-color-main) r g b / 60%) inset;
		opacity: 0;
		transition: opacity 0.3s;
		border: 2px solid;
		border-color: var(--color-white);
	}
	&:hover {
		--text-color: var(--color-white);
	}
	&:not(:hover):not(.active) {
		--size-x: 0%;
		--size-y: 0%;
	}
	&.active {
		--text-color: var(--color-white);
		--card-bg: rgba(255, 255, 255, 0.1);
		transform: scale(1.05);
		&:before {
			opacity: 0;
		}
		&:after {
			opacity: 1;
			transition-delay: 0s;
		}
	}
`;

export const CardHeader = styled(P)`
	color: var(--text-color);
	transition: color 0.2s;
`;

export const DiscountBadge = styled.span`
	width: max-content;
	padding: 4px 10px;
	font-weight: 700;
	font-size: 11px;
	z-index: 1;
	text-transform: uppercase;
	border-radius: 57px;
	position: absolute;
	top: -10px;
	background: radial-gradient(
			139% 103.4% at 90.51% 100%,
			#4a5beb 0%,
			#511771 100%
		),
		rgba(255, 255, 255, 0.1);
	box-shadow: 0 0 12px 0 rgba(255, 255, 255, 0.3) inset;
	&:empty {
		display: none;
	}
`;

export const CardGridWrapper = styled.div`
	display: flex;
	flex-flow: column nowrap;
	gap: inherit;
	align-items: center;
	width: 100%;
`;

export const CardGrid = styled.div`
	display: flex;
	justify-content: center;
	align-items: stretch;
	flex-flow: row nowrap;
	gap: 15px;
	width: 100%;
	height: max-content;
	@media screen and (max-width: 600px) {
		gap: 8px;
	}
`;

export const PeriodText = styled.div`
	font-weight: 700;
	font-size: 56px;
	line-height: 1;
`;

export const PeriodDescription = styled(P)``;

export const PeriodWrapper = styled.div`
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	color: var(--text-color);
	transition: color 0.2s ease-in;
	* {
		color: inherit;
	}
`;

export const MonthPayment = styled(P)`
	font-size: 13px;
	color: var(--color-white-05);
`;
