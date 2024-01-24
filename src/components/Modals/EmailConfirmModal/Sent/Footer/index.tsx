import { P } from '~components/Typography';
import { EmailConfirmResendTimeoutMs } from '~constants/email-confirm';
import { useTimer } from '~hooks/useTimer';

import { useSelector } from '../../../../../store';
import { getLastSent } from '../../../../../store/email-confirm';
import { Timer } from './Footer.styles';

type Props = {
	onResend?: () => void;
	onChangeEmail?: () => void;
};

export const SentFooter = ({ onResend, onChangeEmail }: Props) => {
	const lastSent = useSelector(getLastSent);
	const beforeResend = lastSent + EmailConfirmResendTimeoutMs - Date.now();
	const canResend = beforeResend < 0;

	useTimer(!canResend);

	return (
		<P size="small" transparent multiline>
			If you didn&apos;t get the email,{'\n'}
			{canResend ? (
				<>
					<> try to </>
					<a href="#" onClick={onResend}>
						Resend confirmation
					</a>
				</>
			) : (
				<>
					<> wait </>
					<Timer>{formatMinutes(beforeResend)}</Timer>
					<> to Resend</>
				</>
			)}
			<> or </>
			<a href="#" onClick={onChangeEmail}>
				Change Email
			</a>
		</P>
	);
};

const formatMinutes = (ms: number) => {
	const sec = (ms / 1000) | 0;
	const minStr = Math.floor(sec / 60);
	const secStr = (sec % 60).toFixed(0).padStart(2, '0');

	return `${minStr}:${secStr}`;
};
