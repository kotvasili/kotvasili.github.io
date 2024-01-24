import { styled } from '@linaria/react';

import { hoverable } from '~theme/snippets';

export const MessageWrapper = styled.div`
	position: relative;
	${hoverable};
	:after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		filter: blur(15px);
		z-index: -1;
		transform: translate3d(0, 0, 0);
		background: conic-gradient(
			from 90deg at 50% 50%,
			rgba(254, 58, 208, 0.7),
			rgba(153, 73, 255, 0.7),
			rgba(255, 59, 209, 0.7)
		);
	}
	span:not(.unlock) {
		filter: blur(2px);
		&:empty {
			& ~ * {
				display: none;
			}
		}
	}
	span.unlock {
		font-size: 11.5px;
		color: var(--color-white-03);
		position: absolute;
		bottom: -14px;
		left: 0;
	}
	& > svg {
		position: absolute;
		right: 100%;
		top: 50%;
		margin-right: 10px;
		margin-top: -8.5px;
		@media screen and (max-width: 768px) {
			margin-right: 4px;
		}
	}
`;
