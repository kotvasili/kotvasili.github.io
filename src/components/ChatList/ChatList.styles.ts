import { styled } from '@linaria/react';

import { ContentContainer } from '~components/Typography';

export const ChatListWrapper = styled.div`
	--v-gap: 24px;
	position: relative;
	display: flex;
	flex-flow: column nowrap;
	gap: var(--v-gap);
	min-height: 0;
	@media screen and (max-width: 768px) {
		&:has(+ .chat-container) {
			content-visibility: hidden;
			display: none;
		}
	}
`;

export const ChatListFooter = styled(ContentContainer)`
	margin-top: auto;
	padding-top: 16px;
	align-items: center;
	justify-content: center;
`;

export const ChatListContainer = styled.div`
	flex: 1;
	overflow-x: hidden;
	overflow-y: auto;
	display: flex;
	row-gap: 1px;
	flex-flow: column nowrap;
	margin-top: calc(var(--v-gap) * -1);
	padding-top: var(--v-gap);
	margin-bottom: calc(var(--screen-padding) * -1);
	margin-left: calc(var(--screen-padding) * -1);
	padding-left: var(--screen-padding);
	padding-bottom: var(--screen-padding);
	@media screen and (max-width: 800px) {
		margin-right: calc(var(--screen-padding) * -1);
		padding-right: var(--screen-padding);
	}
	&::-webkit-scrollbar {
		display: none;
	}
`;

export const EmailConfirmWrapper = styled.div`
	position: relative;
	height: 0;
	display: contents;
`;

export const EmailConfirmContainer = styled.div`
	position: absolute;
	left: -24px;
	bottom: 64px;
	@media screen and (max-width: 768px) {
		left: 0;
	}
`;
