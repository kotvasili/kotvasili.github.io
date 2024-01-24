import { useRouter } from 'next/router';
import { ComponentType, useEffect, useRef } from 'react';

import { Toaster } from '~components/Toaster';
import { EmailConfirmTokens } from '~constants/email-confirm';
import {
	useAnnalsEmailConfirmed,
	useAnnalsOnboardingFinished,
} from '~hooks/annals';
import { useEmailConfirmed } from '~hooks/emailConfirm/useEmailConfirmed';
import { useIsEmailConfirmRequired } from '~hooks/emailConfirm/useIsEmailConfirmRequired';
import { useConfirmEmailMutation } from '~services/api/email';

export const useEmailConfirm = (SuccessIcon?: ComponentType) => {
	const { replace, query } = useRouter();

	const [required, isRequiredLoading] = useIsEmailConfirmRequired();
	const [wasConfirmed, wasConfirmedLoading] = useEmailConfirmed();
	const [confirmEmail] = useConfirmEmailMutation();

	const sendAnnalsConfirmed = useAnnalsEmailConfirmed();
	const sendAnnalsOnboardingFinished = useAnnalsOnboardingFinished();

	const checkedRef = useRef(false);
	const token = query['token'] as string;

	const confirm = async () => {
		if (checkedRef.current) return replace('/');
		checkedRef.current = true;

		if (wasConfirmed) return replace('/');

		if (!token) {
			Toaster.showError({ title: 'Email confirmation failed' });
			return replace('/');
		}

		try {
			await confirmEmail({ token }).unwrap();
			void sendAnnalsConfirmed();

			if (required) {
				void sendAnnalsOnboardingFinished();
			}
			await replace('/');
		} catch (e) {
			Toaster.showError({ title: 'Email confirmation failed' });
			return;
		}

		Toaster.show({
			title: required ? undefined : `+${EmailConfirmTokens} Neurons`,
			text: 'Your Email has been confirmed!',
			icon: SuccessIcon,
		});
	};

	useEffect(() => {
		if (wasConfirmedLoading || isRequiredLoading) {
			return;
		}

		void confirm();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wasConfirmedLoading, isRequiredLoading]);
};
