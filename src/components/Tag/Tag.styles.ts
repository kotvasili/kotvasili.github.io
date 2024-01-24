import { styled } from '@linaria/react';

import { P } from '~components/Typography';

export const TagText = styled(P)`
	font-weight: 700;
	text-transform: uppercase;
	color: var(--color-white);
	background-color: var(--brand-common);
	padding: 4px 6px;
	border-radius: 10px;
	box-shadow: var(--shadow-black-inset);
`;
