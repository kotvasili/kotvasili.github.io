import { styled } from '@linaria/react';

export const LoaderWrapper = styled.div<{ size: number }>`
	width: 100%;
	height: 100%;
	display: flex;
	svg {
		margin: auto;
		width: ${({ size }) => `${size}px`};
		height: ${({ size }) => `${size}px`};
	}
`;
