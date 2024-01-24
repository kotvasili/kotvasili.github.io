import { useMemo } from 'react';

import { useGetDialogsQuery } from '~services/api/dialogs';
import { useGetSubscriptionsQuery } from '~services/api/subscriptions';
import { TSubscriptionItemExtended } from '~services/api/subscriptions/types';
import { extractSubscriptionTarget } from '~utils/payments';

import { useSelector } from '../../store';
import { getUserId } from '../../store/auth/authSlice';

export const useSubscriptions = () => {
	const id = useSelector(getUserId);
	const {
		data: subs = { subscriptions: [] },
		isLoading: subsLoading,
		isSuccess: subsSuccess,
	} = useGetSubscriptionsQuery({ id });

	const {
		data: bots,
		isSuccess: botsSuccess,
		isLoading: botsLoading,
	} = useGetDialogsQuery();

	const hasSubscriptions = subs && subs.subscriptions.length > 0;

	const isLoading = useMemo(
		() => botsLoading || subsLoading,
		[botsLoading, subsLoading]
	);
	const isSuccess = useMemo(
		() => botsSuccess && subsSuccess,
		[botsSuccess, subsSuccess]
	);

	if (!hasSubscriptions) {
		return {
			isLoading,
			isSuccess,
			hasData: hasSubscriptions,
			subscriptions: [],
		};
	}

	const data = subs.subscriptions.map((item): TSubscriptionItemExtended => {
		let botName = extractSubscriptionTarget(item.sku);
		if (botName === 'membership') {
			botName = 'main'; // used to find id of main bot to request premium features
		}
		const relatedBot = Object.values(bots ?? {}).find(
			({ uid }) => uid.replace('-', '') === botName
		);
		return {
			...item,
			botUid: relatedBot?.uid ?? '',
			botId: relatedBot?.clientId ?? 0,
			botName: relatedBot?.name ?? '',
		};
	});

	return {
		isLoading,
		isSuccess,
		hasData: hasSubscriptions,
		subscriptions: data,
	};
};
