import { FC } from 'react';

import {
	InterestItem,
	InterestsList,
} from '~components/Interests/Interests.styles';
import { interestText } from '~constants/interests';
import { TBotInterests } from '~services/api/user/types';

type TInterests = {
	interests?: TBotInterests;
};
export const Interests: FC<TInterests> = ({ interests = [] }) => {
	return (
		<InterestsList>
			{interests.map((interest) =>
				interestText[interest] ? (
					<InterestItem key={interest}>{interestText[interest]}</InterestItem>
				) : null
			)}
		</InterestsList>
	);
};
