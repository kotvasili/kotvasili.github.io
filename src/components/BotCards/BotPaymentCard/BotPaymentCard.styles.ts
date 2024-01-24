import { styled } from '@linaria/react';

import { P } from '~components/Typography';

export const BotContentBlock = styled.div<{ gap?: number }>`
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	row-gap: ${({ gap = 16 }) => `${gap}px`};
	width: 100%;
	button.secondary {
		pointer-events: none;
	}
`;

export const BotDescriptionContainer = styled.div<{ maxHeight: string }>`
	height: 1000px;
	font-size: 18px;
	max-height: ${({ maxHeight = '4rem' }) => maxHeight};
	will-change: max-height, mask-image, -webkit-mask-image;
	transition: max-height 0.12s ease-in;
	contain: content;
	&:not(.open) {
		-webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1) 30%, transparent);
	}
`;

export const BotActionWrapper = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
`;
export const BotDescriptionP = styled(P)`
	letter-spacing: -0.4px;
`;

export const BotInluencerHead = styled.div`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
	column-gap: 12px;
	position: absolute;
	top: 0;
	@media screen and (min-width: 769px) {
		display: none;
	}
`;
