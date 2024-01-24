import { FC } from 'react';

import { BotAvatar } from '~components/BotAvatar';
import {
	BotChipDescription,
	BotChipName,
	BotChipWrapper,
} from '~components/BotChip/BotChip.styles';

import TickSimple from '../../../public/assets/icons/tick-simple.svg';

type TBotChipProps = {
	avatarUrl?: string | null;
	name: string;
	text: string;
};
export const BotChip: FC<TBotChipProps> = ({ avatarUrl, text, name }) => {
	return (
		<BotChipWrapper>
			{avatarUrl ? (
				<BotAvatar size={35} avatarUrl={avatarUrl}></BotAvatar>
			) : null}
			<BotChipName size="medium" align="left" weight={700}>
				{name}
				<TickSimple />
			</BotChipName>
			<BotChipDescription size="small" align="left">
				{text}
			</BotChipDescription>
		</BotChipWrapper>
	);
};
