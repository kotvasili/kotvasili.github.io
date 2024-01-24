import { useSubscription } from 'observable-hooks';
import { useCallback } from 'react';

import { Toaster } from '~components/Toaster';
import { wsEvents } from '~services/websocket';
import { isEventType, WsEvent, WsEventType } from '~services/websocket/types';
import { formatCash } from '~utils/payments';

export const NotificationEventListener = () => {
	const toastTrigger = useCallback((event: WsEvent) => {
		if (isEventType(event, WsEventType.NeuronsOrSubscriptionBought)) {
			const { amount, meta } = event.payload;
			const text =
				amount === 0 && meta.subscription
					? `Enjoy your ${meta.description}`
					: `${formatCash(amount)} neurons were added to your account.`;
			Toaster.showSuccess({
				title: 'Congratulations!',
				text,
			});
		}
		if (isEventType(event, WsEventType.LevelChanged)) {
			const { changes, current } = event.payload;
			if (changes.levelChanged > 0) {
				Toaster.showSuccess({
					title: 'Congratulations!',
					text: `You've reached level ${current.level}!`,
				});
			}
		}
	}, []);

	useSubscription(wsEvents.events$, toastTrigger);

	return null;
};
