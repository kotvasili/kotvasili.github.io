import { styled } from '@linaria/react';

import { coverDiv, hoverable, withBlurBg } from '~theme/snippets';

export const SubToggleInner = styled.div`
	width: 14px;
	height: 14px;
	border-radius: 100%;
	background: linear-gradient(
		180deg,
		var(--brand-pink) 0%,
		var(--brand-blue) 100%
	);
	position: relative;
	margin-top: -1px;
	margin-left: -1px;
	&:after {
		content: '';
		position: absolute;
		left: 2px;
		top: 2px;
		background-color: var(--color-black);
		border-radius: 100%;
		width: 10px;
		height: 10px;
	}
`;

export const SubToggleOuter = styled.div<{ enabled: boolean }>`
	width: 30px;
	height: 12px;
	${withBlurBg({ blur: 10, opacity: false })};
	${hoverable};
	box-shadow: 2px 2px 2px #000 inset;
	z-index: 1;
	&:before {
		content: '';
		${coverDiv};
		background-color: var(--color-black);
		border-radius: 10px;
	}
	&.enabled {
		${SubToggleInner} {
			margin-left: auto;
			margin-right: -1px;
		}
	}
	&:after {
		transform: scale(1.4);
	}
`;
