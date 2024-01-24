import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import Image from 'next/image';

import { P } from '~components/Typography';

export const Container = styled.div<{ hasIcon?: boolean }>`
	position: relative;
	display: flex;
	flex-shrink: 0;
	height: 32px;
	min-width: 48px;
	margin-left: ${({ hasIcon }) => (hasIcon ? '8px' : 0)};
	padding-left: ${({ hasIcon }) => (hasIcon ? '24px' : '12px')};
	padding-right: 12px;
	justify-content: flex-end;
	align-items: center;
	border-radius: 15px;
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(12px);
	user-select: none;
	&.clickable {
		cursor: pointer;
		@media (hover: hover), (-moz-touch-enabled: 0), (pointer: fine) {
			&:hover {
				color: var(--color-white);
				background-color: var(--color-white-02);
			}
		}
		&:active {
			color: var(--color-white);
			background-color: var(--color-white-02);
		}
	}
`;

export const Icon = styled(Image)`
	position: absolute;
	top: 2px;
	left: -8px;
`;

export const Title = styled(P)<{ disabled?: boolean; visible?: boolean }>`
	color: ${({ disabled }) => (disabled ? 'var(--color-white-03)' : 'inherit')};
	visibility: ${({ visible = true }) => (visible ? 'inherit' : 'hidden')};
`;

export const ProcessingContainer = styled.div<{ hasIcon: boolean }>`
	position: absolute;
	left: ${({ hasIcon }) => (hasIcon ? '8px' : 0)};
	right: 0;
	display: flex;
	justify-content: center;
`;

export const Processing = styled.div`
	position: relative;
	width: 6px;
	height: 6px;
	border-radius: 3px;
	background-color: var(--color-white);
	color: var(--color-white);
	animation: dot-flashing 0.5s infinite linear alternate;
	animation-delay: 0.25s;

	&::before,
	&::after {
		content: '';
		display: inline-block;
		position: absolute;
		top: 0;
	}
	&::before {
		left: -12px;
		width: 6px;
		height: 6px;
		border-radius: 3px;
		background-color: var(--color-white);
		color: var(--color-white);
		animation: dot-flashing 0.5s infinite alternate;
		animation-delay: 0s;
	}
	&::after {
		left: 12px;
		width: 6px;
		height: 6px;
		border-radius: 3px;
		background-color: var(--color-white);
		color: var(--color-white);
		animation: dot-flashing 0.5s infinite alternate;
		animation-delay: 0.5s;
	}

	@keyframes dot-flashing {
		0% {
			background-color: var(--color-white);
		}
		50%,
		100% {
			background-color: var(--color-white-05);
		}
	}
`;

export const Background = css`
	background: radial-gradient(
			124.52% 124.52% at -3.99% 35.36%,
			#0047ff 0%,
			rgba(0, 78, 255, 0) 69.33%
		),
		radial-gradient(
			108.75% 108.75% at 117.11% 81.18%,
			#b566e6 0%,
			rgba(181, 102, 230, 0) 77.6%
		),
		linear-gradient(0deg, #d0e0f3, #d0e0f3),
		radial-gradient(
			73.57% 73.57% at 0% 67.49%,
			#e478ff 0%,
			rgba(86, 102, 239, 0) 69.33%
		),
		radial-gradient(
			88.4% 88.4% at 86.12% 6.46%,
			#ff1c89 0%,
			rgba(229, 102, 163, 0) 56.56%
		),
		radial-gradient(
			42.61% 55.51% at 60.46% 100%,
			rgba(255, 255, 255, 0.21) 0%,
			rgba(255, 255, 255, 0) 100%
		),
		radial-gradient(
			58.56% 126.24% at 31.37% 0%,
			rgba(255, 255, 255, 0.46) 0%,
			rgba(255, 255, 255, 0) 77.6%
		);
`;
