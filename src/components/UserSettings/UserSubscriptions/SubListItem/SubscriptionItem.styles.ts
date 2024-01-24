import { styled } from '@linaria/react';

import { P } from '~components/Typography';
import { withBlurBg } from '~theme/snippets';

export const ExpiryBlock = styled.div`
	border-top: 1px solid var(--color-white-02);
	border-bottom: 1px solid var(--color-white-02);
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: space-between;
	padding: 16px 0;
	width: 100%;
`;

export const PremiumText = styled(P)`
	margin-bottom: -8px;
`;

export const BotHead = styled.div`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	padding: 3px 10px 3px 4px;
	border-radius: 15px;
	border: 0.5px solid var(--color-white);
	width: max-content;
	column-gap: 5px;
	position: absolute;
	top: -14px;
	& + ${ExpiryBlock} {
		border-top: none;
	}
`;

export const Wrapper = styled.div`
	border-radius: 32px;
	border: 1px solid var(--color-white-05);
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	row-gap: 32px;
	padding: 24px;
	${withBlurBg({})}
	&:has(${BotHead}) {
		border-top: none;
	}
`;
