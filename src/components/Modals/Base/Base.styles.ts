import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { motion } from 'framer-motion';

import { IconButtonWrapper } from '~components/IconButton/IconButton.styles';

export const overlayStyle = css`
	backdrop-filter: blur(10px);
	background-color: var(--color-black-05);
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 100;
	left: 0;
	bottom: var(--keyboard-height, 0);
	contain: paint;
	display: flex;
`;

export const BaseVisibilityWrapper = styled(motion.div)`
	outline: none;
	&:has(~ .fullpage) {
		content-visibility: hidden;
	}
`;

export const BaseFullContainer = styled.div`
	width: 100vw;
	height: 100%;
	min-height: 0;
	background: var(--main-bg);
	position: relative;
	z-index: 0;
	overflow-y: auto;
	overflow-x: hidden;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: flex-start;
	color: var(--color-white);
	contain: paint;

	& > ${IconButtonWrapper} {
		position: sticky;
		top: 0;
		z-index: 2;
		align-self: flex-end;
		height: max-content;
	}
`;
