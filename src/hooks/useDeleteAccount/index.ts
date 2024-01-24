import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Toaster } from '~components/Toaster';
import { useModal } from '~hooks/useModal';
import { useUserId } from '~hooks/useUserId';
import { useUserDeleteMutation } from '~services/api/user';
import { removeToken } from '~utils/token';

import { AppDispatch } from '../../store';
import { logout } from '../../store/utils/logout';

export const useDeleteAccount = () => {
	const dispatch = useDispatch<AppDispatch>();
	const userId = useUserId();
	const { open, isOpen: confirmOpened, close: cancel } = useModal();
	const [deleteUser] = useUserDeleteMutation();
	const confirm = open();

	const act = useCallback(async () => {
		try {
			await deleteUser({ userId }).unwrap();
			Toaster.showSuccess({ title: 'User has been deleted' });

			await removeToken();
			dispatch(logout());
			// TODO: use landing url from env
			window.location.replace(window.location.origin.replace('app.', ''));
		} catch (e) {
			Toaster.showError({ title: 'User deletion failed' });
		}
	}, [deleteUser, dispatch, userId]);

	return { confirm, cancel, confirmOpened, act };
};
