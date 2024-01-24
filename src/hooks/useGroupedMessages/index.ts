import { DateTime } from 'luxon';
import { useMemo } from 'react';

import { TMessage } from '~services/api/dialogs/types';

const changeValues = ['0 days ago', 'in 0 days', '1 day ago'];
const replacingValues = {
	[changeValues[0]]: 'today',
	[changeValues[1]]: 'today',
	[changeValues[2]]: 'yesterday',
};
const getGroupedMessages = (messages: TMessage[]) => {
	const groupedMessages = new Map<string, TMessage[]>();
	messages.forEach((message) => {
		const date = DateTime.fromMillis(message.timestamp);
		let relativeTime = date.toRelative({
			unit: 'days',
		});
		if (changeValues.includes(<string>relativeTime)) {
			relativeTime = replacingValues[relativeTime as string];
		}
		// If the message was sent in the past, show the day and month
		else {
			relativeTime = date.toFormat('ccc d LLL');
		}
		const group = groupedMessages.get(relativeTime) ?? [];
		groupedMessages.set(relativeTime, [...group, message]);
	});
	return groupedMessages;
};

export const useGroupedMessages = (messages: TMessage[]) => {
	const groupedMessages = getGroupedMessages(messages);
	const groupCounts = useMemo(
		() => Array.from(groupedMessages.values()).map((group) => group.length),
		[groupedMessages]
	);

	const groupNames = useMemo(
		() => Array.from(groupedMessages.keys()),
		[groupedMessages]
	);
	return { groupCounts, groupNames };
};
