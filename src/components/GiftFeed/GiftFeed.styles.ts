import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { hoverable } from '~theme/snippets';

export const Container = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	justify-content: center;
	min-width: 0;
`;
export const GiftFeedGrid = styled.div<{ cols: number; isMobile: boolean }>`
	display: grid;
	grid-template-columns: repeat(
		${({ cols }) => (cols > 6 ? 6 : cols)},
		minmax(0, 1fr)
	);
	grid-auto-flow: row;
	place-content: start;
	justify-content: center;
	max-width: 584px;
	flex: 1;
	gap: 6px;
	overflow-y: scroll;

	padding: 20px 15px 0;
	margin-top: -20px;
	scroll-snap-type: y mandatory;
	scroll-padding: 20px 0 0;
	transition: all 0.2s ease-in;

	-webkit-mask-image: linear-gradient(
		180deg,
		transparent,
		rgba(0, 0, 0, 1) 10px,
		rgba(0, 0, 0, 1) 100%
	);

	&::-webkit-scrollbar {
		display: none;
	}

	-ms-overflow-style: none;
	scrollbar-width: none;

	@media screen and (max-width: 425px) {
		grid-template-columns: repeat(4, 1fr);
		margin: 0;
		height: auto;
		max-height: 110px;
	}
`;

export const GiftFeedGridOpened = css`
	height: 210px;

	@media screen and (max-width: 425px) {
		height: auto;
		max-height: 210px;
		padding: 0;
	}
`;

export const ActionButtonWrapper = styled.div`
	padding: 10px;
	${hoverable};
`;

export const ActionButtonWrapperPosition = css`
	position: absolute;
	right: 25px;
	top: -25px;
	padding: 0;
`;

export const CloseFeedMobileLayout = styled.div`
	display: none;
	position: absolute;
	top: -24px;
	right: 12px;

	@media screen and (max-width: 425px) {
		display: block;
	}
`;
