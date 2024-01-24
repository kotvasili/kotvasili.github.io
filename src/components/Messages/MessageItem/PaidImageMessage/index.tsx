import Image from 'next/image';
import { FC } from 'react';

import {
	NeuronsCost,
	PaidImageInner,
	PaidImageWrapper,
} from '~components/Messages/MessageItem/PaidImageMessage/PaidMediaMessage.styles';
import { P } from '~components/Typography';
import { TMessage } from '~services/api/dialogs/types';

import Eye from '../../../../../public/assets/icons/Eye.svg';

export const PaidImageMessage: FC<{
	message: TMessage;
	action?: () => void;
	showPrice?: boolean;
}> = ({ message: { meta }, action, showPrice = false }) => {
	return (
		<PaidImageWrapper onClick={action}>
			<PaidImageInner>
				<Eye />
				<P size="xsmall">Click to unlock</P>
				{showPrice && (meta?.tariffication.cost ?? 0 > 0) ? (
					<NeuronsCost size="small">
						<Image
							width={20}
							height={19}
							src={'/img/neurons/gem-icon.png'}
							alt={'neuron image'}
							quality={100}
						/>
						{meta?.tariffication?.cost}
					</NeuronsCost>
				) : null}
			</PaidImageInner>
		</PaidImageWrapper>
	);
};
