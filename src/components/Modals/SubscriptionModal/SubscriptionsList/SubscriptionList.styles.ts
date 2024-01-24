import { styled } from '@linaria/react';

import { withBlurBg } from '~theme/snippets';

export const SubList = styled.div`
	display: flex;
	flex-flow: column nowrap;
	gap: var(--screen-padding);
	width: 100%;
	max-width: 327px;
`;

export const SubItemsWrap = styled.div`
	gap: inherit;
	display: flex;
	flex-flow: column nowrap;
	${withBlurBg({})};
	&:after {
		opacity: 0.75;
		filter: blur(100px);
	}
`;
