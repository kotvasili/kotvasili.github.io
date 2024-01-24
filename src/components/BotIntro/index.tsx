import { useLocalStorageValue } from '@react-hookz/web';
import { destr } from 'destr';
import { useRouter } from 'next/router';
import { env } from 'next-runtime-env';
import { FC, useCallback, useEffect, useMemo } from 'react';

import { BotIntroModal } from '~components/Modals/BotIntroModal';
import { useCurrentBot } from '~hooks/useCurrentBot';
import { useModal } from '~hooks/useModal';
import { useBotInfoSlidesQuery } from '~services/api/user';

import { IConversationQuery } from '../../types/pages';

type TOnboardingConfig = Record<string, boolean>;
export const BotIntro: FC<{ messageCount: number }> = ({ messageCount }) => {
	const { isOpen, open, close } = useModal();
	const { data, isSuccess } = useBotInfoSlidesQuery();
	const { query } = useRouter();
	const { recipientId } = query as IConversationQuery;
	const { bot, botSuccess } = useCurrentBot({
		recipientId,
	});
	const { value, set } = useLocalStorageValue('botOnboardingModal');

	const onBoardingValue: TOnboardingConfig = useMemo(
		() => destr(value) ?? {},
		[value]
	);
	const botShown = onBoardingValue[recipientId];
	const handleClose = useCallback(() => {
		set(JSON.stringify({ ...onBoardingValue, [recipientId]: true }));
		return close();
	}, [close, onBoardingValue, recipientId, set]);

	useEffect(() => {
		if (messageCount < 2 && !botShown && !isOpen) {
			open()();
		}
	}, [open, recipientId, messageCount, botShown, isOpen]);

	if (!isSuccess || !botSuccess || !data[bot.uid]?.slides) {
		return null;
	}
	const currentSlides = data[bot.uid].slides;

	return (
		<BotIntroModal
			locked
			onClose={handleClose}
			open={isOpen}
			imageUrl={`${env('NEXT_PUBLIC_PUBLIC_API') ?? ''}${
				bot?.images?.webBackgroundPath as string
			}`}
			slides={currentSlides}
		/>
	);
};
