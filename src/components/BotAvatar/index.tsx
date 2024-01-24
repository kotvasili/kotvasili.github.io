import { env } from 'next-runtime-env';
import { FC } from 'react';

import { BotImg, ImageWrapper } from '~components/BotAvatar/BotAvatar.styles';
import { FadeInImage } from '~components/FadeInImage';
import { UnreadCounter } from '~components/UnreadCounter';

type TBotAvatarProps = {
	avatarUrl: string | null;
	size?: number;
	unread?: number;
};
export const BotAvatar: FC<TBotAvatarProps> = ({
	avatarUrl,
	size = 48,
	unread,
}) => {
	const PUBLIC_API = env('NEXT_PUBLIC_PUBLIC_API') ?? '';
	const avatar =
		typeof avatarUrl === 'string'
			? PUBLIC_API + avatarUrl
			: '/img/botPlaceholder.webp';

	return (
		<ImageWrapper size={size}>
			<FadeInImage
				className={BotImg}
				src={avatar}
				alt={''}
				width={size}
				height={size}
			/>
			<UnreadCounter unread={unread} />
		</ImageWrapper>
	);
};
