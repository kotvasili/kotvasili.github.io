import { styled } from '@linaria/react';

import { hoverable } from '~theme/snippets';

export const BTN = styled.button<{ grow: 1 | 0 }>`
	font-family: var(--font);
	row-gap: 14px;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
	column-gap: 8px;
	width: 100%;
	max-width: ${({ grow }) => (grow === 1 ? '100%' : '320px')};
	--BTN-bg: var(--color-white);
	--BTN-color: var(--color-black);
	color: var(--BTN-color);
	background-color: var(--BTN-bg);
	padding: 12px;
	font-size: 0;
	font-weight: 600;
	border-radius: 50px;
	flex: ${({ grow }) => grow};
	border: none;
	${hoverable};
	transition: color 0.15s, background-color 0.15s, backdrop-filter 0.15s,
		box-shadow 0.15s;

	&.primary {
		box-shadow: var(--shadow-white);

		@media (pointer: fine) {
			&:hover {
				box-shadow: var(--shadow-white-active);
			}
		}

		@media (pointer: coarse) {
			&:active {
				box-shadow: var(--shadow-white-active);
			}
		}

		&[disabled] {
			--BTN-bg: var(--color-white-01);
			--BTN-color: var(--color-white-03);
			backdrop-filter: blur(15px);
			box-shadow: none;
		}
	}

	&.secondary {
		--BTN-bg: var(--color-white-01);
		--BTN-color: var(--color-white);
		backdrop-filter: blur(12.5px);

		@media (pointer: fine) {
			&:hover {
				--BTN-bg: var(--color-white-02);
			}
		}

		@media (pointer: coarse) {
			&:active {
				--BTN-bg: var(--color-white-02);
			}
		}

		&[disabled] {
			--BTN-color: var(--color-white-01);
		}
	}

	&[disabled],
	&.loading {
		pointer-events: none;
	}
	span {
		font-size: 18px;
		line-height: 25px;
		&.crossed {
			text-decoration: line-through;
			opacity: 0.5;
		}
	}
`;
