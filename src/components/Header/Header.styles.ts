import { styled } from '@linaria/react';

import { IconButtonWrapper } from '~components/IconButton/IconButton.styles';
import { P } from '~components/Typography';

export const HeaderContainer = styled.header`
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	@media screen and (max-width: 800px) {
		justify-content: flex-start;
		gap: 16px;
		height: 56px;
		${IconButtonWrapper} {
			--icon-size: 28px;
			--clickable-size: 48px;
		}
	}
	@media screen and (max-width: 500px) {
		gap: 10px;
	}
`;

export const PremiumText = styled(P)`
	background: linear-gradient(90deg, #ff8ef9 0.01%, #3478f6 99.98%);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	user-select: none;
`;
