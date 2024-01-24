import { useDebouncedEffect } from '@react-hookz/web';
import { useCallback, useMemo } from 'react';

import { CheckoutReason } from '~constants/annals';
import {
	useAnnalsOpenDigitalCopySubscription,
	useAnnalsOpenStore,
} from '~hooks/annals';
import { useModal } from '~hooks/useModal';
import {
	TBotAvailabilityTrialOptionType,
	TBotConfigExtended,
} from '~services/api/dialogs/types';

export const useBotPaywall = (bot: TBotConfigExtended, messages: number) => {
	const { uid, clientId, name, postConditions } = bot;

	const { isOpen, open: openModal, close: closeModal } = useModal();
	const hasConditions = !!postConditions;

	const annalsOpenStore = useAnnalsOpenStore();
	const annalsOpenDigitalCopySubscription =
		useAnnalsOpenDigitalCopySubscription();

	const open = useCallback(() => {
		void annalsOpenStore({
			reason: CheckoutReason.DigitalCopy,
			bot_UserId: clientId,
			bot_name: name,
		});
		void annalsOpenDigitalCopySubscription({
			bot_UserId: clientId,
			bot_name: name,
		});
		openModal()();
	}, [
		annalsOpenDigitalCopySubscription,
		annalsOpenStore,
		clientId,
		name,
		openModal,
	]);

	const trialOptions: Record<TBotAvailabilityTrialOptionType, number> =
		useMemo(() => {
			const baseOptionsObj = {} as Record<
				TBotAvailabilityTrialOptionType,
				number
			>;
			return hasConditions && postConditions?.trialOptions
				? postConditions.trialOptions.reduce(
						(obj, item) => ({ ...obj, [item.type]: item.value }),
						baseOptionsObj
				  )
				: baseOptionsObj;
		}, [postConditions?.trialOptions, hasConditions]);

	useDebouncedEffect(
		() => {
			if (messages >= trialOptions.messages) {
				open();
			}
		},
		[messages, open, trialOptions.messages, uid],
		300
	);

	const close = useCallback(() => {
		closeModal();
	}, [closeModal]);

	const canSendMessages = useMemo(() => {
		if (!hasConditions) {
			return true;
		}
		return messages < trialOptions.messages;
	}, [hasConditions, messages, trialOptions]);

	return { isOpen, canSendMessages, open, close };
};
