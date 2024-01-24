import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { P } from '~components/Typography';
import { EmailConfirmTokens } from '~constants/email-confirm';
import { useEmailConfirmShow } from '~hooks/emailConfirm/useEmailConfirmShow';
import { useEmailConfirmModal } from '~hooks/emailConfirm/useEmailConfrimModal';

import { emailConfirmRemind } from '../../store/email-confirm';
import {
	Container,
	Content,
	Gem,
	RemindButton,
	VerifyButton,
} from './EmailConfirm.styles';

type Props = {
	withRemind?: boolean;
};

export const EmailConfirm = memo<Props>(({ withRemind }) => {
	const isShow = useEmailConfirmShow(!withRemind);
	const modal = useEmailConfirmModal();

	const dispatch = useDispatch();
	const remind = useCallback(() => {
		dispatch(emailConfirmRemind());
	}, [dispatch]);

	if (!isShow) {
		return null;
	}

	return (
		<Container>
			<Content>
				<P weight={600} size="medium" align="left">
					Get {EmailConfirmTokens} Neurons
				</P>
				<P weight={500} size="medium" align="left" transparent>
					Secure your account & get an instant reward
				</P>
				<VerifyButton text="Verify email" onClick={modal.show} />
				{withRemind && (
					<RemindButton
						text="Remind me later"
						onClick={remind}
						type="secondary"
					/>
				)}
			</Content>
			<Gem src="/img/neurons/gem-icon.png" width={64} height={62} alt="Gem" />
		</Container>
	);
});
EmailConfirm.displayName = 'EmailConfirm';
