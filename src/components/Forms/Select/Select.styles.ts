import { styled } from '@linaria/react';

import { hoverable } from '~theme/snippets';

export const InputElem = styled.select`
	appearance: none;
	${hoverable};

	option {
		color: var(--color-black);
	}
`;

export const SelectArrow = styled.div`
	grid-area: input;
	pointer-events: none;
	position: relative;
	margin-left: auto;
	z-index: 1;
	display: flex;
	padding-right: 12px;
	svg {
		margin: auto;
		width: 24px;
		height: 24px;
		transform: rotate(270deg);
	}
`;
