import { styled } from '@linaria/react';

import { ImageWrapper } from '~components/BotAvatar/BotAvatar.styles';
import { IconButtonWrapper } from '~components/IconButton/IconButton.styles';

export const MessageListHeaderOuter = styled.div`
	padding: 4px var(--chat-horizontal-padding);
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	gap: 16px;
	position: relative;
	z-index: 1;

	${IconButtonWrapper} {
		margin-left: calc(var(--chat-horizontal-padding) * -0.7);
		margin-right: -16px;
		--clickable-size: 48px;
		@media screen and (min-width: 769px) {
			display: none;
		}
	}

	@media screen and (max-width: 500px) {
		${ImageWrapper} {
			--avatar-size: 48px;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}

	p {
		display: flex;
		column-gap: 5px;
		align-items: center;
	}
`;

export const MessageListContent = styled.div`
	display: flex;
	flex-flow: column nowrap;
	flex: 1;
	row-gap: 4px;
	padding-right: 75px;
`;
