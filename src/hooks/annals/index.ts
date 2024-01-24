import { useCallback, useEffect, useMemo } from 'react';

import {
	CheckoutReason,
	EmailConfirmationAction,
	Events,
	OnboardingStep,
} from '~constants/annals';
import { useUserId } from '~hooks/useUserId';
import { useSendEventMutation } from '~services/api/annals';

export const useAnnalsOpenStore = () =>
	useSendEvent<{
		reason?: CheckoutReason;
		bot_UserId?: number | string;
		bot_name?: string;
	}>(Events.OpenStore);

// TODO: should be removed, see note for OpenStoreDigitalCopy
export const useAnnalsOpenDigitalCopySubscription = () =>
	useSendEvent<{
		bot_UserId?: number | string;
		bot_name?: string;
	}>(Events.OpenDigitalCopySubscription);

export const useAnnalsBeginCheckout = ({
	sku,
	reason,
	botClientId,
	botName,
}: {
	sku: string;
	reason?: CheckoutReason;
	botClientId?: number | string;
	botName?: string;
}) => {
	const params = useMemo(
		() => ({
			sku,
			reason,
			bot_UserId: botClientId,
			bot_name: botName,
		}),
		[botClientId, botName, reason, sku]
	);

	return useSendEvent(Events.BeginCheckout, params);
};

// TODO: should be removed, see note for BeginCheckoutDigitalCopy
export const useAnnalsBeginCheckoutDigitalCopy = ({
	sku,
	botClientId,
	botName,
}: {
	sku: string;
	botClientId?: number | string;
	botName?: string;
}) => {
	const params = useMemo(
		() => ({
			sku,
			bot_UserId: botClientId,
			bot_name: botName,
		}),
		[botClientId, botName, sku]
	);

	return useSendEvent(Events.BeginCheckoutDigitalCopy, params);
};

export const useAnnalsSendMsgButton = () => useSendEvent(Events.SendMsgButton);

export const useAnnalsBackToChatList = ({
	unreadCount,
	botName,
	botClientId,
}: {
	unreadCount: number;
	botName: string;
	botClientId: number | string;
}) => {
	const params = useMemo(
		() => ({
			qty_notifications: unreadCount,
			bot_name: botName,
			bot_UserId: botClientId,
		}),
		[botClientId, botName, unreadCount]
	);

	return useSendEvent(Events.BackToChatList, params);
};

export const useAnnalsSendMsgKeyboard = () =>
	useSendEvent(Events.SendMsgKeyboard);

export const useAnnalsChatClickFromList = ({
	botName,
	botClientId,
}: {
	botName: string;
	botClientId: number;
}) => {
	const params = useMemo(
		() => ({
			bot_name: botName,
			bot_UserId: botClientId,
		}),
		[botClientId, botName]
	);

	return useSendEvent(Events.ChatClickFromList, params);
};

export const useAnnalsCopyPaste = () => {
	const sendCopy = useSendEvent<{ text?: string }>(Events.CopyText);
	const sendPaste = useSendEvent<{ text?: string }>(Events.PasteText);

	const onCopy = useCallback(() => {
		const text = document.getSelection()?.toString();
		void sendCopy({ text });
	}, [sendCopy]);

	const onPaste = useCallback(
		(e: ClipboardEvent) => {
			const text = e.clipboardData?.getData('text');
			void sendPaste({ text });
		},
		[sendPaste]
	);

	useEffect(() => {
		addEventListener('copy', onCopy);
		addEventListener('paste', onPaste);

		return () => {
			removeEventListener('copy', onCopy);
			removeEventListener('paste', onPaste);
		};
	}, [onCopy, onPaste]);
};

const EmailConfirmationOpenInboxParams = {
	'step-name': OnboardingStep.EmailConfirmation,
	value: EmailConfirmationAction.OpenInbox,
};

export const useAnnalsEmailConfirmationOpenInbox = () =>
	useSendEvent(Events.Onboarding, EmailConfirmationOpenInboxParams);

const EmailConfirmedParams = {
	'step-name': OnboardingStep.EmailConfirmed,
	value: 1,
};

export const useAnnalsEmailConfirmed = () =>
	useSendEvent(Events.Onboarding, EmailConfirmedParams);

export const useAnnalsOnboardingFinished = () =>
	useSendEvent(Events.OnboardingFinished);

export const useAnnalsOpenGiftFeed = ({
	botName,
	botClientId,
}: {
	botName: string;
	botClientId: number;
}) =>
	useSendEvent(Events.GiftFeedOpened, {
		bot_name: botName,
		bot_UserId: botClientId,
	});

const useSendEvent = <Extra extends { [key: string]: unknown }>(
	event: Events,
	params?: { [key: string]: unknown }
): ((extra?: Extra) => Promise<void>) => {
	const userId = useUserId();
	const [sendEvent] = useSendEventMutation();

	return useCallback(
		async (extra) => {
			const body = {
				...params,
				...extra,
				timestamp: (Date.now() / 1000) | 0,
			};

			try {
				await sendEvent({ userId, event, body }).unwrap();
			} catch {}
		},
		[sendEvent, userId, event, params]
	);
};
