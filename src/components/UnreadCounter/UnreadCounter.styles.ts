import { styled } from '@linaria/react';

export const UnreadCounterElem = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-shadow: var(--shadow-black);
	background-color: var(--brand-common);
	color: var(--color-white);
	position: absolute;
	right: -4px;
	top: -3px;
	font-size: 15px;
	line-height: 15px;
	font-weight: 600;
	transition: transform 0.2s ease-in-out;
	&:empty {
		transform: scale(0);
	}
`;
