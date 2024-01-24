import { css } from '@linaria/core';
import { styled } from '@linaria/react';

export const ImageWrapper = styled.div<{ size: number }>`
	--avatar-size: ${({ size = 48 }) => `${size}px`};
	width: var(--avatar-size);
	height: var(--avatar-size);
	font-size: 0;
	position: relative;
`;

export const BotImg = css`
	border-radius: 100%;
	overflow: hidden;
`;
