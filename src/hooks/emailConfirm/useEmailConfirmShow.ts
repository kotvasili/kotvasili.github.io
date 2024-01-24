import { useEmailConfirmed } from '~hooks/emailConfirm/useEmailConfirmed';
import { useIsEmailConfirmRequired } from '~hooks/emailConfirm/useIsEmailConfirmRequired';

import { useSelector } from '../../store';
import { emailConfirmCanShowBanner } from '../../store/email-confirm';

export const useEmailConfirmShow = (force: boolean): boolean => {
	const [confirmed, isConfirmedLoading] = useEmailConfirmed();
	const [isNewUser, isNewUserLoading] = useIsEmailConfirmRequired();
	const canShowEmailConfirm = useSelector(emailConfirmCanShowBanner);

	return (
		!isConfirmedLoading &&
		!isNewUserLoading &&
		!confirmed &&
		!isNewUser &&
		(force || canShowEmailConfirm)
	);
};
