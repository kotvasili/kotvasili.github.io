import { FC } from 'react';

import { UnreadCounterElem } from '~components/UnreadCounter/UnreadCounter.styles';

export const UnreadCounter: FC<{ unread?: number }> = ({ unread }) => {
	const hasUnread = unread && unread > 0;
	const unreadValue = hasUnread ? (unread > 99 ? ':D' : unread) : null;
	return <UnreadCounterElem>{unreadValue}</UnreadCounterElem>;
};
