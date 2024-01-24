import { styled } from '@linaria/react';
import { JSX } from 'react/jsx-runtime';

import { hoverable } from '~theme/snippets';

import Send from '../../../../public/assets/icons/Send.svg';

export const SendComp = styled(Send)<
	{ disabled: boolean } & JSX.IntrinsicElements['svg']
>`
	grid-area: btn;
	${hoverable};
	align-self: center;
	justify-self: center;
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
	transition: filter 0.2s, transform 0.1s;
	color: var(--color-white);
	&:active {
		transform: ${({ disabled }) => (disabled ? 'none' : 'scale(0.95)')};
	}
	@media (hover: hover), (-moz-touch-enabled: 0), (pointer: fine) {
		&:hover {
			filter: drop-shadow(2px 2px 8px var(--color-white-07));
		}
	}
`;
