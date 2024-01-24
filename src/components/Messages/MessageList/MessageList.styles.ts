import { styled } from '@linaria/react';

export const MessageListContainer = styled.div`
	--message-fz: 18px;
	--message-gap: 20px;
	flex: 1;
	contain: layout;
`;

export const MessageListInner = styled.div`
	color: var(--color-white);
	font-size: var(--message-fz);
	overscroll-behavior: contain;
	-webkit-overflow-scrolling: touch;
`;

export const MessageGroupTitle = styled.div`
	color: var(--color-white-03);
	font-weight: 300;
	text-align: center;
	font-size: 12px;
	text-transform: uppercase;
	pointer-events: none;
	user-select: none;
	padding: 10px 0;
	span {
		border-radius: 30px;
		background-color: var(--color-white-01);
		display: inline-block;
		padding: calc(var(--base-gap) / 4) var(--base-gap);
	}
`;
