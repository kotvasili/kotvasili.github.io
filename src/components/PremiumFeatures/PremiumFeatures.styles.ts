import { styled } from '@linaria/react';

import { P } from '~components/Typography';
import { hoverable } from '~theme/snippets';

export const PremiumContainer = styled.div`
	display: flex;
	flex-flow: column nowrap;
	gap: 16px;
`;

export const PremiumList = styled.ul<{ small: boolean }>`
	list-style: none;
	display: flex;
	flex-flow: column nowrap;
	gap: 8px;
	padding-left: ${({ small }) => (small ? '24px' : 0)};
	& > ul {
		margin-left: -24px;
	}
`;

export const PremiumListItem = styled.li`
	font-size: 16px;
	position: relative;
	&:before {
		position: absolute;
		left: -24px;
		top: 0;
		width: 20px;
		height: 21px;
		content: '';
		background-position: center center;
		background-repeat: no-repeat;
		background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSI5IiBmaWxsPSJub25lIj4KICA8cGF0aCBzdHJva2U9IiNmZmYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTExLjggMSA0LjUgOC41LjggNC43Ii8+Cjwvc3ZnPgo=');
	}
`;

export const PremiumAccordion = styled(PremiumList)<{ open: boolean }>`
	will-change: max-height;
	height: 100%;
	overflow: hidden;
	max-height: ${({ open }) => (open ? '500px' : 0)};
	transition: max-height 0.15s ease-in;
`;

export const PremiumExpander = styled(P)`
	text-decoration: underline;
	${hoverable};
	margin-top: 16px;
`;
