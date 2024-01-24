import { styled } from '@linaria/react';
import { motion } from 'framer-motion';

import { hoverable } from '~theme/snippets';

export const MenuHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	& > svg {
		margin-left: 24px;
	}
`;

export const MenuContent = styled(motion.div)`
	width: 100%;
	max-width: 464px;
	min-height: 100%;
	overflow-y: auto;
	padding: var(--screen-padding);
	display: flex;
	flex-flow: column nowrap;
	position: relative;
	color: var(--color-white);
	background-color: var(--color-black);
	flex: 1;
	gap: 16px;
	@media screen and (max-width: 600px) {
		padding: var(--screen-padding) calc(var(--screen-padding) / 2);
	}
`;

export const MenuLink = styled.div<{ disabled?: boolean }>`
	color: var(--color-white);
	font-size: 18px;
	font-weight: 500;
	${hoverable};
	padding: 16px 32px;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
	span {
		color: var(--color-white-03);
	}
	p {
		opacity: ${({ disabled }) => (disabled ? 0.5 : 'none')};
	}
	p:not(:last-child) {
		margin-right: 16px;
	}
`;
