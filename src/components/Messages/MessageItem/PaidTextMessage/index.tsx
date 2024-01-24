import { FC } from 'react';

import { MessageWrapper } from '~components/Messages/MessageItem/PaidTextMessage/PaidTextMessage.styles';
import { TMessage } from '~services/api/dialogs/types';

import Lock from '../../../../../public/assets/icons/Lock.svg';
export const PaidTextMessage: FC<{
	message: TMessage;
	userId: string;
	action?: () => void;
}> = ({ message: { encodedText }, action }) => {
	return (
		<MessageWrapper onClick={action}>
			<span>{encodedText}</span> <span className="unlock">Click to unlock</span>
			<Lock />
		</MessageWrapper>
	);
};
