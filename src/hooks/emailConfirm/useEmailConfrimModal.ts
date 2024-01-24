import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useEmailConfirmed } from '~hooks/emailConfirm/useEmailConfirmed';

import { useSelector } from '../../store';
import {
	emailConfirmHideModal,
	emailConfirmIsModalOpened,
	emailConfirmModalOpened,
	emailConfirmShowModal,
} from '../../store/email-confirm';

export const useEmailConfirmModal = (): {
	isOpened: boolean;
	show: () => void;
	hide: () => void;
} => {
	const opened = useSelector(emailConfirmIsModalOpened);
	const [confirmed, loading] = useEmailConfirmed();

	const dispatch = useDispatch();

	const show = useCallback(() => {
		dispatch(emailConfirmShowModal());
	}, [dispatch]);

	const hide = useCallback(() => {
		dispatch(emailConfirmHideModal());
	}, [dispatch]);

	const isOpened = opened && !loading && !confirmed;

	useEffect(() => {
		if (!isOpened) return;

		dispatch(emailConfirmModalOpened());
	}, [dispatch, isOpened]);

	return { isOpened, show, hide };
};
