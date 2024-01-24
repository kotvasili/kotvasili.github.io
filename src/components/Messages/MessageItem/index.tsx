import { FC, memo, useMemo } from 'react';

import { AudioMessageComponent } from '~components/Messages/MessageItem/AudioMessage';
import { GiftMessage } from '~components/Messages/MessageItem/GiftImageMessage';
import { ImageMessage } from '~components/Messages/MessageItem/ImageMessage';
import {
	Message,
	TopicContainer,
} from '~components/Messages/MessageItem/MessageItem.styles';
import { PaidTextMessage } from '~components/Messages/MessageItem/PaidTextMessage';
import { TextMessage } from '~components/Messages/MessageItem/TextMessage';
import { Topic } from '~components/Topic';
import { useMessageProcessing } from '~hooks/useMessageProcessing';
import { usePremiumTopics, useTopics } from '~hooks/useTopics';
import type { TMessage } from '~services/api/dialogs/types';
import { TSupportedMessageTypes } from '~services/api/dialogs/types';
import { transformMessagePaymentType } from '~utils/payments';

import { PaidImageMessage } from './PaidImageMessage';

const MessageItem: FC<
	TMessage & { userId: string; botId: string; showTopic?: boolean }
> = (props) => {
	const { sender, meta, tag, id: messageId, showTopic, botId } = props;
	const cost = meta?.tariffication?.cost ?? 0;
	const isPaid = meta?.tariffication?.paid ?? false;
	const topicId = meta?.automation?.topicId;
	const hasPreview = typeof meta?.preview === 'string';
	const hasAudio = meta?.hasAudio === true;
	const attachments = useMemo(
		() => meta?.attachments ?? [],
		[meta?.attachments]
	);
	const hasAttachments = attachments.length > 0 || hasPreview || hasAudio;

	const topics = useTopics(botId);
	const { premiumTopics, cache } = usePremiumTopics(botId);
	const topic = useMemo(() => {
		if (showTopic) {
			return [...topics, ...premiumTopics, ...cache].find(
				(topic) => topic.Id === topicId
			);
		}

		return null;
	}, [cache, premiumTopics, showTopic, topicId, topics]);

	const messageType = transformMessagePaymentType(
		meta?.tariffication?.type,
		cost,
		isPaid,
		props.userId === sender
	);

	const messageContentType: TSupportedMessageTypes = useMemo(() => {
		if (hasAttachments) {
			if (hasAudio) {
				return 'audio';
			}
			if (
				(hasPreview && !meta?.giftPreview) ||
				attachments[0]?.mediatype?.includes('image')
			) {
				return 'image';
			}
		}

		if (meta?.giftPreview) {
			return 'gift';
		}

		if (meta?.reference) {
			return 'image';
		}

		return 'text';
	}, [meta, hasAttachments, hasAudio, hasPreview, attachments]);

	const { showPaid, showPrice, action } = useMessageProcessing(
		messageType,
		messageContentType,
		isPaid,
		cost,
		props.userId,
		messageId,
		botId
	);

	const pickMessageContent = useMemo(() => {
		if (messageContentType === 'image') {
			return showPaid ? (
				<PaidImageMessage
					message={props}
					showPrice={showPrice}
					action={action}
				/>
			) : (
				<ImageMessage message={props} />
			);
		}
		if (messageContentType === 'gift' && props.meta?.giftPreview) {
			return showPaid ? (
				<PaidImageMessage
					message={props}
					showPrice={showPrice}
					action={action}
				/>
			) : (
				<GiftMessage giftPreview={props.meta.giftPreview} />
			);
		}
		if (messageContentType === 'text' && showPaid) {
			return (
				<PaidTextMessage
					userId={props.userId}
					message={props}
					action={action}
				/>
			);
		}
		if (messageContentType === 'audio') {
			return <AudioMessageComponent message={props} botId={botId} />;
		}
		return <TextMessage message={props} />;
	}, [action, botId, messageContentType, props, showPaid, showPrice]);

	return (
		<>
			{topic && (
				<TopicContainer>
					<Topic topic={topic} />
				</TopicContainer>
			)}

			<Message id={tag} isMy={props.userId === sender}>
				{pickMessageContent}
			</Message>
		</>
	);
};

export default memo(MessageItem);
