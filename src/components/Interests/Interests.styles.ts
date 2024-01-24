import { styled } from '@linaria/react';

export const InterestsList = styled.div`
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	justify-content: center;
	gap: 12px;
	&:empty {
		display: none;
	}
`;

export const InterestItem = styled.div`
	display: flex;
	padding: 6px 14px;
	align-items: center;
	gap: 14px;
	text-transform: capitalize;
	border-radius: 100px;
	border: 1px solid var(--color-white-02);
	background: var(--color-black-05);
	font-size: 16px;
	font-weight: 500;
	line-height: 160%;
	color: var(--color-white-07);
	user-select: none;
`;
