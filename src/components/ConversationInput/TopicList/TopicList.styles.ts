import { styled } from '@linaria/react';

export const Container = styled.div`
	--gradient-end: calc(100% - 20px);
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	grid-area: topics;
	max-width: calc(100% + 40px);
	place-self: center;
	margin: 0 -20px;
	padding: calc(var(--base-gap) + 4px) 20px 4px;
	overflow-x: auto;
	-webkit-mask-image: linear-gradient(
		270deg,
		transparent,
		rgba(0, 0, 0, 1) 30px,
		rgba(0, 0, 0, 1) var(--gradient-end),
		transparent
	);
	@media (hover: none) {
		scrollbar-width: none; /* Firefox */
		::-webkit-scrollbar {
			display: none; /* Safari and Chrome */
		}
	}
`;

export const List = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	gap: 16px;
`;
