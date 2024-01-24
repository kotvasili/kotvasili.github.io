import { styled } from '@linaria/react';
import { motion } from 'framer-motion';

import { IconButtonWrapper } from '~components/IconButton/IconButton.styles';
import { ContentContainer } from '~components/Typography';

export const EmailConfirmContent = styled(motion.div)`
	padding: calc(var(--screen-padding) * 1.5) calc(var(--screen-padding) * 2);
	width: 100%;
	height: 100%;
	max-width: 608px;
	max-height: 608px;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	gap: 24px;
	overflow-y: hidden;
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
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
	@media screen and (orientation: landscape) and (max-height: 550px) {
		justify-content: flex-start;
	}

	& > ${ContentContainer} {
		padding-top: 16px;
	}

	& > ${IconButtonWrapper} {
		position: absolute;
		top: 4px;
		right: 4px;
		padding: 8px;
		z-index: 1;
	}

	@media screen and (max-height: 540px) {
		img {
			display: none;
		}
	}
`;
