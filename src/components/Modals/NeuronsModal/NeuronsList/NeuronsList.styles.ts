import { styled } from '@linaria/react';

import { withBlurBg } from '~theme/snippets';

export const NeuronsGrid = styled.div`
	display: flex;
	justify-content: center;
	align-items: stretch;
	gap: 15px;
	${withBlurBg({})};
	width: 100%;
	height: max-content;
	@media screen and (max-width: 600px) {
		gap: 8px;
	}
`;
export const NeuronsGridWrap = styled.div`
	display: flex;
	flex-flow: column nowrap;
	gap: inherit;
	align-items: center;
	transform: translate3d(0, 0, 0);
`;
