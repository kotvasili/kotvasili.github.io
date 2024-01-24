import { FC, useCallback } from 'react';

import { useAnnalsSendMsgButton } from '~hooks/annals';

import { SendComp } from './SendButton.styles';
type TSendButton = {
	disabled: boolean;
	onSend: () => void;
};
export const SendButton: FC<TSendButton> = ({ disabled, onSend }) => {
	const annalsSendMsgButton = useAnnalsSendMsgButton();

	const handleClick = useCallback(() => {
		void annalsSendMsgButton();
		onSend();
	}, [annalsSendMsgButton, onSend]);

	return <SendComp onClick={handleClick} disabled={disabled} />;
};
