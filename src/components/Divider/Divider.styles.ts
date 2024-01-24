import { styled } from '@linaria/react';

export const DividerBlock = styled.div<{ maxWidth?: number }>`
	width: 100%;
	max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : '100%')};
	font-size: 14px;
	color: var(--color-white-05);
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 16px 0;
	span {
		display: inline-block;
		padding: 0 8px;
	}
	&:before,
	&:after {
		content: '';
		height: 1px;
		background-color: var(--color-white-05);
		flex: 1;
	}
`;
