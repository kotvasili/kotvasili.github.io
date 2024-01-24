import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { UserInfoForm } from '~components/Forms/UserInfoForm';
import { Level } from '~components/Level';
import { ConfirmModal } from '~components/Modals/ConfirmModal';
import { H1 } from '~components/Typography';
import {
	UserInfoAction,
	UserInfoTitle,
} from '~components/UserSettings/UserInfo/UserInfo.styles';
import {
	SettingsSection,
	SettingsWrapper,
} from '~components/UserSettings/UserSettings.styles';
import { useDeleteAccount } from '~hooks/useDeleteAccount';
import { fadeIn } from '~theme/snippets';
import { removeToken } from '~utils/token';

import { AppDispatch } from '../../../store';
import { logout } from '../../../store/utils/logout';

type Props = {
	onClose?: () => void;
};

export const UserInfo = ({ onClose }: Props) => {
	const dispatch = useDispatch<AppDispatch>();

	const deleteAccount = useDeleteAccount();

	const triggerLogout = useCallback(async () => {
		await removeToken();
		dispatch(logout());
		window.location.replace(window.location.origin.replace('app.', ''));
	}, [dispatch]);

	const cancelDeleteAccount = useCallback(() => {
		onClose?.();
		void deleteAccount.cancel();
	}, [deleteAccount, onClose]);

	return (
		<>
			<SettingsWrapper className={fadeIn}>
				<H1 align="left">
					My profile <Level />
				</H1>
				<SettingsSection>
					<UserInfoTitle align="left" size="medium" transform="uppercase">
						General
					</UserInfoTitle>
					<UserInfoForm />
				</SettingsSection>
				<SettingsSection>
					<UserInfoTitle align="left" size="medium" transform="uppercase">
						Account
					</UserInfoTitle>
					<UserInfoAction onClick={triggerLogout}>Log out</UserInfoAction>
					<UserInfoAction danger onClick={deleteAccount.confirm}>
						Delete account
					</UserInfoAction>
				</SettingsSection>
			</SettingsWrapper>
			<ConfirmModal
				open={deleteAccount.confirmOpened}
				locked={false}
				invert
				onClose={cancelDeleteAccount}
				title="Are you sure?"
				info="If you delete your account, you will permanently lose your profile and messages. EVA settings and progress will be reset."
				confirmText="Delete Account"
				cancelText="Not Now"
				onConfirm={deleteAccount.act}
			/>
		</>
	);
};
