import { env } from 'next-runtime-env';
import { FC, PropsWithChildren } from 'react';

import { BotChip } from '~components/BotChip';
import { FadeInImage } from '~components/FadeInImage';
import { H1, H2 } from '~components/Typography';
import { useCurrentBot } from '~hooks/useCurrentBot';

import LogoEye from '../../../../public/assets/logoEye.svg';
import {
	BotContent,
	BotImage,
	CardWrapper,
	PromoBlockBottom,
	PromoBlockHead,
} from './BaseLayout.styles';

export type TBotFullPageCard = {
	botId: string | number;
	promo: boolean;
	showImage?: boolean;
};

export const BotFullPageCard: FC<PropsWithChildren & TBotFullPageCard> = ({
	botId,
	promo,
	showImage = true,
	children,
}) => {
	const { bot, botSuccess } = useCurrentBot({ recipientId: botId });
	const hasImage = !!bot?.images?.webBackgroundPath;
	if (!botSuccess) {
		return null;
	}

	return (
		<CardWrapper className={promo ? 'promo' : ''}>
			{promo ? (
				<>
					<PromoBlockHead>
						<LogoEye />
						<H1 align="left" transform="uppercase">
							Jump into your desires with EDEN AI
						</H1>
						<H2 align="left" transform="uppercase">
							BY EVA AI
						</H2>
					</PromoBlockHead>
					<PromoBlockBottom>
						<BotChip
							avatarUrl={bot?.images?.chatAvatarPath}
							name={bot.name}
							text="Digital Duplicate"
						></BotChip>
					</PromoBlockBottom>
				</>
			) : null}
			{hasImage && showImage ? (
				<BotImage>
					<FadeInImage
						src={`${env('NEXT_PUBLIC_PUBLIC_API') ?? ''}${
							bot.images.webBackgroundPath as string
						}`}
						quality={100}
						alt={bot.name}
						fill
						sizes="(max-width: 500px) 350px, (max-width: 768px) 440px, 600px"
					/>
				</BotImage>
			) : null}
			<BotContent>{children}</BotContent>
		</CardWrapper>
	);
};
