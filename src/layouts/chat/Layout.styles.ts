import { styled } from '@linaria/react';

export const LayoutWrapper = styled.main`
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-areas: 'left center right';
	grid-template-columns: 280px 1fr 320px;
	align-content: stretch;
	justify-content: space-between;
	gap: 16px;
	padding: var(--screen-padding);
	@media screen and (max-width: 1100px) {
		grid-template-areas: 'left center';
		grid-template-columns: 280px 1fr;
	}
	@media screen and (max-width: 768px) {
		grid-template-areas: 'center';
		grid-template-columns: 1fr;
		padding-top: 0; //TODO check live
	}
	@media screen and (max-width: 508px) {
		padding-left: var(--base-gap);
		padding-right: var(--base-gap);
	}
`;

export const ChatAside = styled.div`
	grid-area: right;
	@media screen and (max-width: 1100px) {
		grid-area: center;
		position: absolute;
		right: var(--screen-padding);
		top: var(--screen-padding);
		z-index: 2;
	}
	@media screen and (max-width: 768px) {
		top: 0;
		right: 0;
	}
`;
