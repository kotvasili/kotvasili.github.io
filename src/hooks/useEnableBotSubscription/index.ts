import { useEffect } from 'react';

import { useUserId } from '~hooks/useUserId';
import { useSetBotSubscriptionMutation } from '~services/api/user';

//sends a be call that sets proper tags to user for enabling bot subscription functionality
export const useEnableBotSubscription = () => {
	const userId = useUserId();
	const [submit, { isSuccess, isLoading }] = useSetBotSubscriptionMutation();
	useEffect(() => {
		if (userId && !isSuccess && !isLoading) {
			void submit({ id: userId });
		}
	}, [userId, isSuccess, submit, isLoading]);
};
