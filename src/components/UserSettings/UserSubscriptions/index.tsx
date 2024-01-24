import { H1, P } from '~components/Typography';
import {
	SettingsSection,
	SettingsWrapper,
} from '~components/UserSettings/UserSettings.styles';
import { fadeIn } from '~theme/snippets';

import { SubscriptionList } from './SubList';

export const UserSubscriptions = () => {
	return (
		<SettingsWrapper className={fadeIn}>
			<SettingsSection>
				<H1 align="left">My subscriptions</H1>
				<P align="left" size="medium" transparent>
					Here you could manage all of your subscriptions and access
				</P>
			</SettingsSection>
			<SubscriptionList />
		</SettingsWrapper>
	);
};
