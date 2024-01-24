import { styled } from '@linaria/react';
import { motion } from 'framer-motion';

import { IconButtonWrapper } from '~components/IconButton/IconButton.styles';

export const ConfirmContent = styled(motion.div)`
	border-radius: 32px;
	padding: 48px 56px;
	background: var(--main-bg);
	position: relative;
	margin: auto;

	& > ${IconButtonWrapper} {
		position: absolute;
		right: 24px;
		top: 24px;
	}

	@media screen and (max-width: 800px) {
		margin-bottom: var(--screen-padding);
	}
	@media screen and (max-width: 600px) {
		padding: 48px 16px;
		& > ${IconButtonWrapper} {
			top: 16px;
		}
	}
`;

export const ConfirmContentMain = styled.div`
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	row-gap: 24px;
	max-width: 336px;
	h1 {
		text-wrap: wrap;
	}
`;

export const ConfirmActions = styled.div`
	margin-top: 30px;
	display: flex;
	flex-flow: column nowrap;
	row-gap: 20px;
	align-items: center;
`;
