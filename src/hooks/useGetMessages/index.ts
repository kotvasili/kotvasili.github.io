import { useState } from 'react';

import { MESSAGES_COUNT } from '~constants/dialogs';
import { useGetMessagesQuery } from '~services/api/dialogs';

export const useGetMessages = (id: string, recipientId: string) => {
	const [omit, setOmit] = useState(0);
	const { messages, isEnd, isLoading, isFetching, isError } =
		useGetMessagesQuery(
			{
				recipientId,
				id,
				omit,
			},
			{
				selectFromResult: ({ data, ...otherParams }) => {
					const messages = data?.messages ?? [];
					const hasResponse = !!data?.receivedCount;
					const isEnd = hasResponse
						? data.receivedCount < MESSAGES_COUNT
						: true;
					return {
						messages,
						isEnd,
						...otherParams,
					};
				},
			}
		);

	return {
		messages,
		isEnd,
		isLoading,
		isFetching,
		isError,
		setOmit,
	};
};
