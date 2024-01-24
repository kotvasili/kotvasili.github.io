import { styled } from '@linaria/react';

import { P } from '~components/Typography';
import { hoverable } from '~theme/snippets';

export const UserInfoTitle = styled(P)`
	font-weight: 600;
	color: var(--color-white-03);
	margin-bottom: 16px;
`;

export const UserInfoAction = styled(P)<{ danger?: boolean }>`
	display: flex;
	${hoverable};
	padding: 16px 0;
	font-weight: 500;
	color: ${({ danger = false }) =>
		danger ? 'var(--color-error)' : 'var(--color-white)'};
`;
