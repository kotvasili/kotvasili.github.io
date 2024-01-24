import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { IconButtonWrapper } from '~components/IconButton/IconButton.styles';
import { ConfirmContent } from '~components/Modals/ConfirmModal/ConfirmModal.styles';

export const BotInfoContent = styled(ConfirmContent)`
	width: 100%;
	max-width: 820px;
	display: flex;
	flex-flow: row wrap;
	align-items: flex-end;
	@media screen and (max-width: 600px) {
		justify-content: center;
		height: 100%;
		max-height: 70%;
	}
	${IconButtonWrapper} {
		z-index: 10;
	}
`;

export const BotIntroImage = css`
	object-fit: contain;
	object-position: bottom center;
	position: absolute;
	left: 56px;
	bottom: 0;
	@media screen and (max-width: 600px) {
		left: auto;
		right: auto;
		width: 100%;
		max-width: 400px;
		opacity: 0.8;
	}
`;

export const BotIntroSliderContent = styled.div`
	position: relative;
	z-index: 1;
	@media screen and (min-width: 601px) {
		margin-left: auto;
	}
`;
