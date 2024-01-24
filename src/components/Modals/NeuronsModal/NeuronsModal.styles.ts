import { styled } from '@linaria/react';
import { motion } from 'framer-motion';

import { IconButtonWrapper } from '~components/IconButton/IconButton.styles';

export const NeuronDialogContent = styled(motion.div)`
	padding: calc(var(--screen-padding) * 1.5) calc(var(--screen-padding) * 2);
	width: 100%;
	height: 100%;
	max-width: 608px;
	max-height: 608px;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	gap: 32px;
	overflow-y: auto;
	overflow-x: hidden;
	position: relative;
	margin: auto;
	background: var(--main-bg);
	box-shadow: 0 4px 80px rgba(0, 0, 0, 0.5);
	border-radius: 32px;
	@media screen and (max-width: 600px) {
		padding: calc(var(--screen-padding) * 1.4) calc(var(--screen-padding) / 2)
			calc(var(--screen-padding) / 1.4);
		justify-content: flex-start;
		height: max-content;
		margin-bottom: 0;
	}
	@media screen and (orientation: landscape) and (max-height: 550px) {
		justify-content: flex-start;
	}

	& > ${IconButtonWrapper} {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1;
	}
`;
