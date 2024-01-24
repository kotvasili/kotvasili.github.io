import { styled } from '@linaria/react';

export const SettingsWrapper = styled.div`
	display: flex;
	flex-flow: column nowrap;
	gap: 32px;
	padding-left: var(--screen-padding);
	padding-right: var(--screen-padding);
`;

export const SettingsSection = styled.div`
	h1 + p {
		margin-top: 8px;
	}
`;
