import { useRouter } from 'next/router';
import { env } from 'next-runtime-env';

import { FadeInImage } from '~components/FadeInImage';
import { useCurrentBot } from '~hooks/useCurrentBot';

import { IConversationQuery } from '../../types/pages';
import { BotAvatar } from './BotBackgroundImage.styles';

export const BotChatBackgroundImage = ({
	recipientId,
}: {
	recipientId?: string;
}) => {
	const { query } = useRouter();
	const { recipientId: botId } = query as IConversationQuery;
	const { bot, botSuccess } = useCurrentBot({
		recipientId: recipientId ?? botId,
	});
	return botSuccess && bot.images?.webBackgroundPath !== null ? (
		<FadeInImage
			src={`${env('NEXT_PUBLIC_PUBLIC_API') ?? ''}${
				bot?.images?.webBackgroundPath
			}`}
			fill
			alt={bot.name}
			className={`${BotAvatar}`}
			priority
			quality={100}
		/>
	) : null;
};
