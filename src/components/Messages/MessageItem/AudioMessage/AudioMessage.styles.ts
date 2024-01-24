import { styled } from '@linaria/react';

export const MessageAudioWrapper = styled.div`
	display: flex;
	flex-flow: row;
	align-items: center;
	justify-content: flex-start;
	height: 40px;
	&:after {
		content: '';
		display: block;
		position: absolute;
		z-index: -1;
		opacity: 1;
		left: 22px;
		width: 40px;
		height: 40px;
		filter: blur(10px);
		transition: blur 0.2s, transform 0.2s, opacity 0.2s;
		transform-origin: left center;
		background: var(--blur-bg);
		border-radius: 999px;
	}
`;

export const LockImageWrapper = styled.div`
	position: absolute;
	left: 0;
`;

export const IconWrapper = styled.div`
	margin-right: 12px;
	display: flex;
	width: 36px;
	height: 36px;
	border-radius: 18px;
	align-items: center;
	justify-items: center;
	justify-content: center;
	background-color: black;
	cursor: pointer;
`;

export const LoadingWrapper = styled(IconWrapper)`
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	animation-name: rotate;
	animation-duration: 2s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
`;
