import { styled } from '@linaria/react';

export const ConversationOuter = styled.div`
	--chat-horizontal-padding: var(--screen-padding);
	--chat-header-offset: 64px;
	position: relative;
	min-height: 0;
	grid-area: center;
	will-change: max-height;

	@media screen and (max-width: 768px) {
		background: var(--page-bg);
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 1;
		--webkit-backface-visibility: hidden;
	}
`;

export const ConversationInner = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	max-width: 680px;
	margin: 0 auto;
	display: grid;
	grid-template-rows: auto minmax(0, 1fr) auto;
	z-index: 1;
	@media screen and (max-width: 768px) {
		max-width: 100%;
	}
`;

export const ConversationLoader = styled.div`
	position: absolute;
	right: 0;
	top: 56px;
	display: flex;
	pointer-events: none;
`;
