import type { FC } from 'react';
import { forwardRef, useCallback, useRef } from 'react';
import { Components, GroupedVirtuoso, VirtuosoHandle } from 'react-virtuoso';

import MessageItem from '~components/Messages/MessageItem';
import {
	MessageGroupTitle,
	MessageListContainer,
	MessageListInner,
} from '~components/Messages/MessageList/MessageList.styles';
import { MESSAGES_COUNT } from '~constants/dialogs';
import { useGroupedMessages } from '~hooks/useGroupedMessages';
import type { TMessage } from '~services/api/dialogs/types';
import { fadeIn } from '~theme/snippets';

type TMessageListProps = {
	onScrollTop: (isTopReached: boolean) => void;
	messages: TMessage[];
	userId: string;
	botId: string;
	total: number;
};

const Scroller: Components['Scroller'] = forwardRef((props, ref) => {
	return <MessageListContainer {...props} ref={ref} />;
});
const List: Components['List'] = forwardRef((props, ref) => {
	return <MessageListInner {...props} ref={ref} />;
});
Scroller.displayName = 'Scroller';
List.displayName = 'List';

const getMessageAtIndex =
	(messages: TMessage[], total: number, userId: string, botId: string) =>
	// eslint-disable-next-line react/display-name
	(index: number) => {
		const messageIdIndex = messages.length - (total - index);
		const message = messages[messageIdIndex];

		const topicId = message?.meta?.automation?.topicId;
		const prevTopicId = findLastBotMessageBeforeIndex(
			messages,
			messageIdIndex,
			botId
		)?.meta?.automation?.topicId;

		const showTopic = !!topicId && topicId !== prevTopicId;

		return (
			<MessageItem
				{...message}
				key={message?.tag}
				userId={userId}
				botId={botId}
				showTopic={showTopic}
			/>
		);
	};

const MessageList: FC<TMessageListProps> = ({
	messages = [],
	onScrollTop,
	userId,
	botId,
	total,
}) => {
	const scrollRef = useRef<VirtuosoHandle>(null);
	const { groupCounts, groupNames } = useGroupedMessages(messages);
	const startIndex = total - messages.length;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const itemContent = useCallback(
		getMessageAtIndex(messages, total, userId, botId),
		[messages, total, userId]
	);

	const initialTopMostItemIndex = messages.length > 0 ? messages.length - 1 : 0;
	return (
		<GroupedVirtuoso
			className={fadeIn}
			ref={scrollRef}
			atTopStateChange={onScrollTop}
			atTopThreshold={400}
			firstItemIndex={startIndex < 0 ? 0 : startIndex}
			components={{ List, Scroller }}
			initialTopMostItemIndex={initialTopMostItemIndex}
			groupCounts={groupCounts}
			itemContent={itemContent}
			followOutput={(isAtBottom: boolean) => {
				if (isAtBottom) {
					return 'smooth'; // can be 'auto' or false to avoid scrolling
				} else {
					return false;
				}
			}}
			initialItemCount={MESSAGES_COUNT}
			alignToBottom
			increaseViewportBy={{ top: 400, bottom: 300 }}
			groupContent={(index) => (
				<MessageGroupTitle>
					<span>{groupNames[index]}</span>
				</MessageGroupTitle>
			)}
		/>
	);
};
export default MessageList;

const findLastBotMessageBeforeIndex = (
	messages: TMessage[],
	index: number,
	botId: string
): TMessage | undefined => {
	index = Math.min(index, messages.length - 1);

	while (--index >= 0) {
		const message = messages[index];
		if (message.sender === botId) {
			return message;
		}
	}
};
