import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';

import { BotAvatar } from '~components/BotAvatar';
import { IconButton } from '~components/IconButton';
import { Level } from '~components/Level';
import {
	MessageListContent,
	MessageListHeaderOuter,
} from '~components/Messages/MessageListHeader/MessageListHeader.styles';
import { P } from '~components/Typography';
import { UnreadCounter } from '~components/UnreadCounter';
import { useAnnalsBackToChatList } from '~hooks/annals';
import { useCurrentBot } from '~hooks/useCurrentBot';
import { useGetDialogsQuery } from '~services/api/dialogs';

import ArrowBack from '../../../../public/assets/icons/arrowBack.svg';
import TickSimple from '../../../../public/assets/icons/tick-simple.svg';

type TMessageListHeaderProps = {
	recipientId: string;
};
export const MessageListHeader: FC<TMessageListHeaderProps> = ({
	recipientId,
}) => {
	const { bot, botSuccess } = useCurrentBot({ recipientId });

	const type = bot?.accountType ?? '';
	const botName = bot?.name ?? '';
	const botClientId = bot?.clientId ?? '';

	const { replace } = useRouter();
	const { unread } = useGetDialogsQuery(undefined, {
		selectFromResult: ({ data = {}, ...other }) => {
			const unread = Object.values(data).reduce((sum, obj) => {
				if (obj.message && typeof obj.message.unreadCount === 'number') {
					return sum + obj.message.unreadCount;
				}
				return sum;
			}, 0);
			return {
				unread,
				...other,
			};
		},
	});

	const sendAnnalsBack = useAnnalsBackToChatList({
		unreadCount: unread,
		botName,
		botClientId,
	});
	const back = useCallback(() => {
		void sendAnnalsBack();
		void replace('/');
	}, [replace, sendAnnalsBack]);

	return (
		<MessageListHeaderOuter>
			<IconButton onClick={back}>
				<ArrowBack />
				<UnreadCounter unread={unread} />
			</IconButton>
			<BotAvatar avatarUrl={bot?.images?.chatAvatarPath} size={56} />
			<MessageListContent>
				{botSuccess && (
					<P size="large" align="left">
						{bot?.name}
						{type === 'influencer' && <TickSimple />}
					</P>
				)}
				<Level />
			</MessageListContent>
		</MessageListHeaderOuter>
	);
};
