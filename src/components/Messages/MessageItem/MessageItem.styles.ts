import { styled } from '@linaria/react';

export const TopicContainer = styled.div`
	display: flex;
	justify-content: center;
`;

export const Message = styled.div<{ isMy: boolean }>`
	display: flex;
	flex-flow: row nowrap;
	justify-content: ${({ isMy }) => (isMy ? 'flex-end' : 'flex-start')};
	color: ${({ isMy }) => (isMy ? 'var(--color-white-03)' : 'inherit')};
	padding-block: 10px;
	padding-left: ${({ isMy }) =>
		`calc(var(--chat-horizontal-padding) + ${isMy ? 30 : 0}px)`};
	padding-right: var(--chat-horizontal-padding);
	white-space: pre-line;
	word-break: break-word;
	position: relative;
	@keyframes fadeinout {
		0% {
			opacity: 0;
			transform: translateY(10px);
		}
		50% {
			opacity: 1;
			transform: none;
		}
		100% {
			opacity: 0;
			transform: translateY(-10px);
		}
	}
	&:before {
		display: ${({ isMy }) => (isMy ? 'inline' : 'none')};
		content: attr(data-exp);
		position: absolute;
		left: var(--chat-horizontal-padding);
		top: 11px;
		font-size: 16px;
		color: var(--color-white);
		text-shadow: 0 0 10px var(--color-white), 0 0 20px var(--color-white);
		animation: fadeinout 2s linear forwards;
	}
`;
