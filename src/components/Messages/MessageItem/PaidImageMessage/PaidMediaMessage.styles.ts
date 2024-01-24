import { styled } from '@linaria/react';

import { P } from '~components/Typography';
import { withBlurBg } from '~theme/snippets';
export const PaidImageWrapper = styled.div`
	cursor: pointer;
	width: 160px;
	height: 160px;
	${withBlurBg({ blur: 15 })}
`;
export const PaidImageInner = styled.div`
	width: 100%;
	height: 100%;
	color: var(--color-white-05);
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	row-gap: 8px;
	border-radius: 24px;
	background: radial-gradient(
			75% 75% at 50% 50%,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.8) 100%
		),
		rgba(0, 0, 0, 0.5);

	p {
		color: inherit;
	}
`;

export const NeuronsCost = styled(P)`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
	color: var(--color-white) !important;
	column-gap: 8px;
	font-weight: 600;
`;
