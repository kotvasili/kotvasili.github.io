import type { FC } from 'react';

import { IconButton } from '~components/IconButton';
import { Modal } from '~components/Modals/Base';
import { NeuronsList } from '~components/Modals/NeuronsModal/NeuronsList';
import { NeuronDialogContent } from '~components/Modals/NeuronsModal/NeuronsModal.styles';
import type { TModalProps } from '~components/Modals/types';
import { ToC } from '~components/ToC';
import { ContentContainer, H1, P } from '~components/Typography';
import { TShopNeuronsPack } from '~services/api/credits/types';

import Close from '../../../../public/assets/icons/close.svg';

const effect = {
	hidden: {
		y: 60,
		opacity: 0,
	},
	visible: {
		y: '0',
		opacity: 1,
		transition: {
			ease: 'easeInOut',
			duration: 0.25,
		},
	},
	exit: {
		y: 60,
		opacity: 0,
		transition: {
			ease: 'easeIn',
			duration: 0.15,
		},
	},
};
export const NeuronsModal: FC<
	TModalProps & {
		title?: string;
		onSelect: (item: TShopNeuronsPack) => void;
		requestedCost: number;
	}
> = ({
	open,
	locked,
	onClose,
	title = 'Add Neurons',
	onSelect,
	requestedCost,
}) => {
	return (
		<Modal open={open} locked={locked} onClose={onClose}>
			<NeuronDialogContent
				variants={effect}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<IconButton onClick={onClose}>
					<Close />
				</IconButton>
				<ContentContainer>
					<H1>{title}</H1>
					<P>The more you buy the cheaper the Neurons!</P>
				</ContentContainer>
				<NeuronsList
					open={open}
					onSelect={onSelect}
					requestedCost={requestedCost}
				/>
				<ContentContainer>
					<P size={'small'}>Viewing romantic messages costs 2 Neurons</P>
					<ToC refund />
				</ContentContainer>
			</NeuronDialogContent>
		</Modal>
	);
};
