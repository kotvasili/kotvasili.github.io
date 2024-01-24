import { css } from '@linaria/core';
import { styled } from '@linaria/react';

export const InputShadow = styled.div`
	grid-area: input;
	pointer-events: none;
	box-shadow: 0 0 0 0 var(--brand-pink);
	border-radius: var(--input-br);
	will-change: opacity, box-shadow;
`;

export const inputStyles = css`
	grid-area: input;
	outline: none;
	background: var(--color-white-01);
	backdrop-filter: blur(12.5px);
	border-radius: var(--input-br);
	border: 1px solid transparent;
	padding: 12px;
	font-size: 16px;
	line-height: 24px;
	font-weight: 400;
	will-change: border-color, box-shadow;
	transition: border-color 0.3s, box-shadow 0.15s;
	min-width: 0;
	width: 100%;
	color: var(--color-white);
	font-family: var(--font);
	@keyframes animShadow {
		to {
			box-shadow: 0 0 45px 40px rgba(1, 123, 255, 0.3);
			opacity: 0;
		}
	}

	&::placeholder {
		color: var(--color-white-07);
	}

	::-webkit-calendar-picker-indicator {
		filter: invert(1);
	}

	&:focus {
		box-shadow: var(--shadow-input-focus);
		border-color: var(--brand-blue-medium);
		& ~ ${InputShadow} {
			animation: animShadow 0.3s forwards;
		}
	}

	&[disabled] {
		opacity: 0.7;
		pointer-events: none;
	}
	&[type='date'] {
		-webkit-appearance: none;
	}
`;

export const InputName = styled.span`
	font-size: 14px;
	line-height: 20px;
	color: var(--color-white);
	grid-area: head;
	min-width: 0;
	flex: 0;
`;

export const InputElem = styled.input``;

export const InputMessage = styled.div`
	grid-area: message;
	min-width: 0;
	font-size: 12px;
	line-height: 16px;
	color: var(--color-white-05);
	&:empty {
		display: none;
	}
`;

export const InputWrapper = styled.label<{ width?: number }>`
	--input-br: 12px;
	--flex-items: calc(100 / ${({ width = 100 }) => width});
	width: calc(
		(100% / var(--flex-items)) -
			(((var(--flex-items) - 1) / var(--flex-items)) * 8px)
	);
	min-width: 0;
	display: grid;
	grid-template-areas:
		'head'
		'input'
		'message';
	gap: 8px;

	&.error {
		.${inputStyles} {
			border-color: var(--color-error);
			box-shadow: var(--shadow-input-error);
		}
		${InputName}, ${InputMessage} {
			color: var(--color-error);
		}
	}
`;
