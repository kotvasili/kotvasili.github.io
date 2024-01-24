import { styled } from '@linaria/react';

export const ConversationInputContainer = styled.div`
	--input-padding: 20px;
	width: 100%;
	min-width: 0;
	border-radius: 24px;
	column-gap: var(--base-gap);
	box-shadow: 0 32px 64px rgba(0, 0, 0, 0.1876),
		0 2px 21px rgba(0, 0, 0, 0.1474);
	backdrop-filter: blur(12.5px);
	background-color: var(--color-white-01);
	padding: var(--input-padding) 20px;
	margin-top: auto;
	display: grid;
	grid-template-areas: 'input btn' 'topics topics';
	grid-template-columns: minmax(0, 1fr) 34px;
	grid-template-rows: auto 1fr;
	@media screen and (max-width: 768px) {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
`;
