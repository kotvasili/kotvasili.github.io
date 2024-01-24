import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

export const useHackRemoveQueryToken = (onRemoved?: () => void) => {
	const { replace, query } = useRouter();

	const removeQueryParam = useCallback(
		async (param: string) => {
			const updatedQuery = query;
			delete updatedQuery[param];

			await replace({ query: updatedQuery }, undefined, { shallow: true });
			onRemoved?.();
		},
		[onRemoved, query, replace]
	);

	useEffect(() => {
		if (!query['token']) return;

		void (async () => {
			try {
				await removeQueryParam('token');
			} catch {}
		})();
	}, [query, removeQueryParam]);
};
