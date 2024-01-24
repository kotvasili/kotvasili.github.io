import { FC, PropsWithChildren, useMemo } from 'react';

import { Loader } from '~components/Loader';
import { useAuth } from '~hooks/useAuth';

import { AuthContext } from './index';

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const { isAuthenticated, id, email } = useAuth();

	const value = useMemo(
		() => ({
			isAuthenticated,
			id,
			email,
		}),
		[isAuthenticated, id, email]
	);
	return (
		<AuthContext.Provider value={value}>
			{isAuthenticated ? children : <Loader />}
		</AuthContext.Provider>
	);
};
