import type { ChangeEvent, FC } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';

import { ConversationInputContainer } from '~components/ConversationInput/ConversationInput.styles';
import { SendButton } from '~components/ConversationInput/SendButton';
import { ConversationTextarea } from '~components/ConversationInput/TextArea';
import { TopicList } from '~components/ConversationInput/TopicList';
import { MAX_MESSAGE_LENGTH } from '~constants/dialogs';
import { useAuthContext } from '~context/auth';
import { useAnnalsSendMsgKeyboard } from '~hooks/annals';
import { useLastBotId } from '~hooks/useLastBotId';
import { usePaidMessageSending } from '~hooks/usePaidMessageSending';
import { usePremiumTopics, useTopics } from '~hooks/useTopics';
import { buildMessageFromString } from '~utils/messages';

type TChatInput = {
	recipientId: string;
};

export const ChatInput: FC<TChatInput> = ({ recipientId }) => {
	const { id } = useAuthContext();

	const ref = useRef<{
		focus(): void;
		blur(): void;
	}>({ focus: () => undefined, blur: () => undefined });

	const [message, setMessage] = useState('');
	const { sendMessage, isLoading } = usePaidMessageSending();
	const topics = useTopics(recipientId);
	const { premiumTopics } = usePremiumTopics(recipientId);
	const annalsSendMsgKeyboard = useAnnalsSendMsgKeyboard();
	const { setLastBotId } = useLastBotId();

	const showTopics = !!topics.length || !!premiumTopics.length;

	const submit = useCallback(() => {
		const sent = sendMessage({
			recipientId,
			id,
			message: buildMessageFromString(message, id),
		});

		if (sent) {
			ref.current.focus();
		}

		setMessage('');
		setLastBotId(recipientId);
	}, [id, message, recipientId, sendMessage, setLastBotId]);

	const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
	}, []);

	const disabled = useMemo(
		() =>
			isLoading ||
			message.trim().length === 0 ||
			message.length >= MAX_MESSAGE_LENGTH,
		[isLoading, message]
	);

	const onKeyPress = useCallback(
		(e: KeyboardEvent) => {
			const len = message.trim().length;
			if (
				e.key === 'Enter' &&
				!e.shiftKey &&
				len > 0 &&
				len <= MAX_MESSAGE_LENGTH
			) {
				e.preventDefault();
				void annalsSendMsgKeyboard();
				void submit();
			}
		},
		[annalsSendMsgKeyboard, message, submit]
	);

	return (
		<ConversationInputContainer>
			<ConversationTextarea
				value={message}
				onChange={handleChange}
				ref={ref}
				onKeyPress={onKeyPress}
			/>
			<SendButton onSend={submit} disabled={disabled} />
			{showTopics && (
				<TopicList
					recipientId={recipientId}
					onClick={() => ref.current.focus()}
				/>
			)}
		</ConversationInputContainer>
	);
};
