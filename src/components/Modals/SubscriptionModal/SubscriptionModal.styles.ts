import { styled } from '@linaria/react';

import { IconButtonWrapper } from '~components/IconButton/IconButton.styles';
import { BaseFullContainer } from '~components/Modals/Base/Base.styles';

export const SubscriptionDialogContent = styled(BaseFullContainer)`
	padding: 0 var(--screen-padding) var(--screen-padding);
	row-gap: 32px;
	& > ${IconButtonWrapper} {
		margin-right: calc(var(--screen-padding) * -1);
		margin-bottom: -32px;
	}
`;
