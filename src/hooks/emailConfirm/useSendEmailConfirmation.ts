import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Toaster } from '~components/Toaster';
import { useAuth } from '~hooks/useAuth';
import { useChangeEmailMutation } from '~services/api/auth';
import { useSendEmailConfirmationMutation } from '~services/api/email';

import { useSelector } from '../../store';
import { getUserId } from '../../store/auth/authSlice';
import { emailConfirmWasSend } from '../../store/email-confirm';

export const useSendEmailConfirmation = (): ((
	email?: string
) => Promise<boolean>) => {
	const userId = useSelector(getUserId);
	const [send] = useSendEmailConfirmationMutation();
	const [changeEmail] = useChangeEmailMutation();
	const { email } = useAuth();

	const dispatch = useDispatch();

	return useCallback(
		async (newEmail) => {
			try {
				if (newEmail && email !== newEmail) {
					await changeEmail({ email: newEmail }).unwrap();
				} else {
					await send({ userId }).unwrap();
					dispatch(emailConfirmWasSend());
				}

				Toaster.showSuccess({
					title: `A confirmation Email has been sent to ${newEmail ?? email}`,
				});

				return true;
			} catch (e) {
				Toaster.showError({ title: 'Send email confirmation failed' });
			}

			return false;
		},
		[email, send, userId, dispatch, changeEmail]
	);
};
