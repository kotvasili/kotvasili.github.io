import { ChangeEvent, memo, useCallback } from 'react';

import { Button } from '~components/Button';
import { FormInput } from '~components/Forms/Input';
import { ContentContainer, H1, P } from '~components/Typography';
import { EmailConfirmTokens } from '~constants/email-confirm';

import { Icon } from '../Icon';
import { emailInput } from './styles';

type Props = {
	isConfirmRequired: boolean;
	email: string;
	onEmailChanged?: (email: string) => void;
	onSend?: () => void;
};

export const Email = memo(
	({ isConfirmRequired, email, onEmailChanged, onSend }: Props) => {
		const title = isConfirmRequired
			? 'Protect your Account\n& keep it Private'
			: `Protect your account\n& get ${EmailConfirmTokens} neurons`;

		const setEmail = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				onEmailChanged?.(e.target.value);
			},
			[onEmailChanged]
		);

		return (
			<>
				<ContentContainer>
					<H1 transform="capitalize" weight={500}>
						{title}
					</H1>
					<P multiline transparent>
						Validate address to keep account private and secure
					</P>
				</ContentContainer>
				<Icon isNewUser={isConfirmRequired} />
				<FormInput
					name="email"
					value={email}
					placeholder="email"
					onChange={setEmail}
					className={emailInput}
				/>
				<Button text="Send confirmation" onClick={onSend} />
				<P size="small" transparent>
					We will send you verification link
				</P>
			</>
		);
	}
);
Email.displayName = 'EmailConfirmEmail';
