import { styled } from '@linaria/react';

import { P } from '~components/Typography';

export const BotChipWrapper = styled.div`
	display: grid;
	grid-template-areas: 'ava name' 'ava text';
	grid-template-rows: 1fr auto;
	grid-template-columns: auto 1fr;
	column-gap: var(--base-gap);
	& > div:first-child {
		grid-area: ava;
	}
`;
export const BotChipName = styled(P)`
	grid-area: name;
	svg {
		margin-left: 6px;
		margin-bottom: -2px;
	}
`;

export const BotChipDescription = styled(P)`
	grid-area: text;
`;
