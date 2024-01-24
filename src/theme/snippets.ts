import { css } from '@linaria/core';

export const fadeIn = css`
	@keyframes animate-fade {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	animation: animate-fade 0.2s cubic-bezier(0.4, 0, 0.6, 1);
`;

export const coverDiv = `
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
`;

export const withHover = css`
	position: relative;
	&:after {
		content: '';
		z-index: -1;
		${coverDiv};
		height: 22px;
		max-width: 220px;
		top: calc(50% - 11px);
		background: var(--blur-bg);
		filter: blur(32px);
		opacity: 0;
		border-radius: 999px;
		will-change: left, top, width, height, filter, transform;
	}
	@media (hover: hover), (-moz-touch-enabled: 0), (pointer: fine) {
		&:hover {
			&:after {
				transition: opacity 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
				opacity: 1;
			}
		}
	}
`;

export const hoverable = `
	user-select: none;
	cursor: pointer;
`;

export const withBlurBg = ({
	blur = 100,
	opacity = true,
}: {
	blur?: number;
	opacity?: boolean;
}) => `
	position: relative;
	&:after {
		content: '';
		border-radius: 200px;
		${coverDiv};
		z-index: -1;
		background: var(--blur-bg);
		opacity: ${opacity ? 0.75 : 'unset'};
		filter: blur(${blur}px);
		-webkit-transform: translate3d(0,0,0);
	}
`;

export const FormGrid = css`
	--form-column-gap: 8px;
	display: flex;
	align-items: flex-start;
	flex-flow: row wrap;
	column-gap: var(--form-column-gap);
	row-gap: 12px;
	& + button {
		margin-top: 32px;
	}
	& ~ button {
		margin-top: 24px;
		max-width: 100%;
	}
`;
