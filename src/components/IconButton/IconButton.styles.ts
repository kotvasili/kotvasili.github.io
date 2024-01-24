import { styled } from '@linaria/react';

import { P } from '~components/Typography';
import { hoverable } from '~theme/snippets';

export const IconButtonWrapper = styled.div<{
	background: boolean;
	iconSize: number;
	clickableSize: number;
}>`
	--icon-size: ${({ iconSize }) => `${iconSize}px`};
	--clickable-size: ${({ clickableSize }) => `${clickableSize}px`};
	${hoverable};
	color: var(--color-white-07);
	transition: color 0.2s, background-color 0.2s;
	font-size: 0;
	row-gap: 8px;
	display: inline-flex;
	flex-flow: row nowrap;
	border-radius: 100%;
	padding: calc((var(--clickable-size) - var(--icon-size)) / 2);
	background-color: ${({ background }) =>
		background ? 'var(--color-white-01)' : 'none'};
	position: relative;
	svg {
		width: var(--icon-size);
		height: var(--icon-size);
	}
	&:hover {
		color: var(--color-white);
		background-color: ${({ background }) =>
			background ? 'var(--color-white-02)' : 'none'};
	}
	${P} {
		color: inherit;
	}
`;
