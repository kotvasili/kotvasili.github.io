import { useCallback } from 'react';

import { useBotPaywallContext } from '~context/botPaywall';
import { useSendMessageMutation } from '~services/api/dialogs';
import { TMessageRequestBody } from '~services/api/dialogs/types';

export const usePaidMessageSending = () => {
	const [sendMessage, { isLoading }] = useSendMessageMutation();
	const { open, canSendMessages } = useBotPaywallContext();

	const sendMessageWithPaymentConditionsCheck = useCallback(
		(args: {
			id: string;
			recipientId: string;
			message: TMessageRequestBody;
		}): boolean => {
			if (canSendMessages) {
				void sendMessage(args);
				return true;
			} else {
				open();
				return false;
			}
		},
		[open, canSendMessages, sendMessage]
	);

	return { sendMessage: sendMessageWithPaymentConditionsCheck, isLoading };
};
