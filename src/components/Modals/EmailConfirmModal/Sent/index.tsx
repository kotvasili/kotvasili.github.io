import { memo, useCallback } from 'react';

import { Button } from '~components/Button';
import { ContentContainer, H1, P } from '~components/Typography';
import { useAnnalsEmailConfirmationOpenInbox } from '~hooks/annals';

import { Icon } from '../Icon';
import { SentFooter } from './Footer';

type Props = {
	isConfirmRequired: boolean;
	email: string;
	onResend?: () => void;
	onChangeEmail?: () => void;
};

export const Sent = memo(
	({ isConfirmRequired, email, onResend, onChangeEmail }: Props) => {
		const domain = email.split('@')[1];
		const sendAnnalsOpenInbox = useAnnalsEmailConfirmationOpenInbox();

		const goToEmail = useCallback(() => {
			void sendAnnalsOpenInbox();

			const url = `https://${domain}`;
			window.open(url, '_blank');
		}, [domain, sendAnnalsOpenInbox]);

		return (
			<>
				<ContentContainer>
					<H1 transform="capitalize" weight={500}>
						Verification link{'\n'}
						has been sent
					</H1>
					<P multiline transparent>
						Click the link we have sent to{'\n'}
						{email}
					</P>
				</ContentContainer>
				<Icon isNewUser={isConfirmRequired} />
				<Button text={`Check your ${domain} Account`} onClick={goToEmail} />
				{isConfirmRequired && (
					<Button
						text="Change email"
						onClick={onChangeEmail}
						type="secondary"
					/>
				)}
				<SentFooter {...{ onResend, onChangeEmail }} />
			</>
		);
	}
);
Sent.displayName = 'EmailConfirmSent';
