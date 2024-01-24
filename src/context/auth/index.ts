import { createContext, useContext } from 'react';

import { TAuthState } from '~context/auth/types';

export const AuthContext = createContext<TAuthState>({
	isAuthenticated: false,
	id: '',
	email: '',
});
export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw Error('Auth context no context Provider');
	}
	return context;
};
