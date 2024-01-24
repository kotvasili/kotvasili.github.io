import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { H2, P } from '~components/Typography';
import { coverDiv, hoverable } from '~theme/snippets';

export const SideContainer = styled.div``;

export const animate1 = css`
	animation: move1 15s 1s alternate infinite;

	@keyframes move1 {
		0% {
			transform: rotate(180deg);
		}
		50% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

export const animate2 = css`
	animation: move2 18s alternate infinite;

	@keyframes move2 {
		0% {
			transform: rotate(360deg);
		}

		50% {
			transform: rotate(180deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}
`;

export const animate3 = css`
	animation: move3 15s 2s alternate infinite;

	@keyframes move3 {
		0% {
			transform: rotate(360deg);
		}

		50% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(180deg);
		}
	}
`;

export const Particle = styled.div`
	position: absolute;
	filter: blur(9px);
	width: 25px;
	height: 25px;
	@keyframes scale {
		0% {
			transform: scale(1);
		}
		25% {
			transform: scale(1);
		}
		100% {
			transform: scale(calc(1 + (var(--i) - 1) * 1));
		}
	}
	&:after {
		content: '';
		position: absolute;
		top: 50%;
		left: -8px;
		width: 15px;
		height: 15px;
		background: var(--blur-bg);
		border-radius: 50%;
		animation: scale calc(var(--i) * 10s) calc(var(--i) * 5s) ease-in alternate
			infinite;
	}
	&:first-child {
		left: 35%;
		top: 20px;
		&:after {
			width: 18px;
			height: 18px;
		}
	}
	&:nth-child(2) {
		top: 30px;
		left: 5px;
		&:after {
			width: 24px;
			height: 24px;
		}
	}
	&:last-child {
		bottom: 15px;
		right: 25%;
		&:after {
			width: 15px;
			height: 15px;
		}
	}
`;
export const ParticlesWrapper = styled.div`
	${coverDiv};
	z-index: -1;
	pointer-events: none;
	transition: opacity 0.1s;
`;

export const NeuronBtnText = styled(H2)``;

export const NeuronBtnWrapper = styled.div`
	position: relative;
	${hoverable};
	z-index: 1;

	@media screen and (max-width: 1100px) {
		${NeuronBtnText}, ${ParticlesWrapper} {
			display: none;
		}
	}

	&:hover {
		${ParticlesWrapper} {
			opacity: 0;
		}
		${Particle} {
			animation-play-state: paused;
			&:after {
				animation-play-state: paused;
			}
		}
	}
`;

export const NeuronBtnFront = styled.div`
	padding: 16px 24px;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
`;

export const Neurons = styled(P)`
	font-weight: 700;
`;

export const NeuronBtnIcon = styled.div`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	gap: 8px;
`;
