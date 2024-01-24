import type { FC, PropsWithChildren } from 'react';
import { useMemo } from 'react';

import { tags } from '~constants/userTags';
import { PayWallContext } from '~context/paywall/index';
import { useUserTags } from '~hooks/useTags';
import { useBalanceQuery } from '~services/api/credits';

export const PayWallContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const { userTags, isLoading: tagsLoading, id } = useUserTags();
	const { data, isLoading: balanceLoading } = useBalanceQuery({ id });
	const hasSubscription = userTags.includes(tags.subscription);

	const value = useMemo(
		() => ({
			hasSubscription,
			balance: data?.balance ?? 0,
			loading: balanceLoading || tagsLoading,
		}),
		[hasSubscription, data?.balance, balanceLoading, tagsLoading]
	);
	return (
		<PayWallContext.Provider value={value}>{children}</PayWallContext.Provider>
	);
};
