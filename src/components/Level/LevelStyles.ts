import { styled } from '@linaria/react';
import { motion } from 'framer-motion';

export const LevelWrapper = styled(motion.div)`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	column-gap: 12px;
`;

export const LevelRow = styled.div`
	flex: 1;
	max-width: 196px;
	height: 8px;
	background-color: var(--color-white-01);
	border-radius: 5px;
`;

export const LevelProgress = styled.div<{ progress: number }>`
	height: 100%;
	border-radius: 5px;
	width: 100%;
	max-width: ${({ progress }) => `${progress}%`};
	min-width: 3px;
	will-change: max-width;
	transition: max-width 0.2s ease-in;
	background-color: var(--color-white);
	box-shadow: 0 0 10px var(--color-white);
`;

export const LevelLvl = styled.p`
	font-size: 15px;
	font-weight: 500;
	line-height: 1;
`;
