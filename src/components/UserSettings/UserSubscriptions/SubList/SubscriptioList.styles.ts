import { styled } from '@linaria/react';

import { SettingsSection } from '~components/UserSettings/UserSettings.styles';

export const List = styled(SettingsSection)`
	display: flex;
	flex-flow: column nowrap;
	row-gap: 32px;
	min-height: 200px;
`;

export const LinksSection = styled(SettingsSection)`
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	row-gap: 16px;
	& > * {
		width: 100%;
	}
	a {
		color: var(--color-white-07);
	}
`;
