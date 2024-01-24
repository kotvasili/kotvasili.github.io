import { useMemo } from 'react';

import { TAuthState } from '~context/auth/types';
import { useAuthenticateQuery } from '~services/api/auth';

export const useAuth = () => {
	const { data, isSuccess } = useAuthenticateQuery();
	const isAuthenticated = useMemo(() => isSuccess, [isSuccess]);
	const id = useMemo(() => data?.id || '', [data?.id]);
	const email = useMemo(() => data?.email || '', [data?.email]);
	const result: TAuthState = useMemo(
		() => ({ isAuthenticated, id, email }),
		[isAuthenticated, id, email]
	);
	return result;
};
