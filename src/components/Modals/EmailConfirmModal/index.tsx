import { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { IconButton } from '~components/IconButton';
import { Modal } from '~components/Modals/Base';
import { Email } from '~components/Modals/EmailConfirmModal/Email';
import { Sent } from '~components/Modals/EmailConfirmModal/Sent';
import { useEmailConfirmModal } from '~hooks/emailConfirm/useEmailConfrimModal';
import { useIsEmailConfirmRequired } from '~hooks/emailConfirm/useIsEmailConfirmRequired';
import { useSendEmailConfirmation } from '~hooks/emailConfirm/useSendEmailConfirmation';
import { useAuth } from '~hooks/useAuth';

import Close from '../../../../public/assets/icons/close.svg';
import { emailConfirmWasSend } from '../../../store/email-confirm';
import { EmailConfirmContent } from './EmailConfirmModal.styles';

const effect = {
	hidden: {
		y: 60,
		opacity: 0,
	},
	visible: {
		y: '0',
		opacity: 1,
		transition: {
			ease: 'easeInOut',
			duration: 0.25,
		},
	},
	exit: {
		y: 60,
		opacity: 0,
		transition: {
			ease: 'easeIn',
			duration: 0.15,
		},
	},
};

export const EmailConfirmModal = memo(() => {
	const dispatch = useDispatch();
	const { email } = useAuth();
	const [newEmail, setNewEmail] = useState(email);
	const { isOpened, show, hide } = useEmailConfirmModal();
	const sendEmailConfirmation = useSendEmailConfirmation();
	const [sent, setSent] = useState(false);

	const [isConfirmRequired] = useIsEmailConfirmRequired();

	const send = useCallback(async () => {
		const ok = await sendEmailConfirmation(newEmail);
		if (!ok) return;

		setSent(true);
	}, [newEmail, sendEmailConfirmation]);

	const showEmail = useCallback(() => {
		setSent(false);
	}, []);

	const showSent = useCallback(() => {
		setSent(true);
	}, []);

	useEffect(() => {
		if (!isConfirmRequired) return;

		dispatch(emailConfirmWasSend());
		showSent();
		show();
	}, [isConfirmRequired, dispatch, show, showSent]);

	return (
		<Modal open={isOpened} onClose={hide} locked={isConfirmRequired}>
			<EmailConfirmContent
				variants={effect}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				{!isConfirmRequired || !sent ? (
					<IconButton onClick={() => (!sent ? showSent() : hide())} background>
						<Close />
					</IconButton>
				) : null}
				{sent ? (
					<Sent
						isConfirmRequired={isConfirmRequired}
						email={newEmail}
						onResend={send}
						onChangeEmail={showEmail}
					/>
				) : (
					<Email
						isConfirmRequired={isConfirmRequired}
						email={newEmail}
						onEmailChanged={setNewEmail}
						onSend={send}
					/>
				)}
			</EmailConfirmContent>
		</Modal>
	);
});

EmailConfirmModal.displayName = 'EmailConfirmModal';
