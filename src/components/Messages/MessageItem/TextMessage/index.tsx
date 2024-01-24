import type { FC } from 'react';

import type { TMessage } from '~services/api/dialogs/types';

export const TextMessage: FC<{ message: TMessage }> = ({
	message: { text },
}) => {
	return <>{text}</>;
};
