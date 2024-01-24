import { styled } from '@linaria/react';

export const TextAreaWrapper = styled.div`
	border-radius: 15px;
	padding: 12px 0 12px 16px;
	background-color: var(--color-white-01);
	font-size: 0;
	grid-area: input;
`;

export const TextAreaInput = styled.textarea`
	border: none;
	background: transparent;
	outline: none;
	color: var(--color-white);
	padding-right: 16px;
	resize: none;
	font-size: 16px;
	max-height: 86px;
	width: 100%;
	::placeholder {
		color: var(--color-white-03);
		font-size: 16px;
	}
`;
