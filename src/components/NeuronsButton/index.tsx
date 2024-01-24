import Image from 'next/image';
import { useRouter } from 'next/router';
import type { CSSProperties } from 'react';

import {
	animate1,
	animate2,
	animate3,
	NeuronBtnFront,
	NeuronBtnIcon,
	NeuronBtnText,
	NeuronBtnWrapper,
	Neurons,
	Particle,
	ParticlesWrapper,
} from '~components/NeuronsButton/NeuronsButton.styles';
import { CheckoutReason } from '~constants/annals';
import { usePayWallActionsContext, usePayWallContext } from '~context/paywall';
import { withHover } from '~theme/snippets';
import { formatCash } from '~utils/payments';

export interface MyCustomCSS extends CSSProperties {
	'--i': number;
}

export const NeuronsButton = () => {
	const { balance } = usePayWallContext();
	const { openNeurons } = usePayWallActionsContext();
	const { query } = useRouter();
	const botClientId = (query.recipientId as string) ?? '';
	return (
		<NeuronBtnWrapper
			onClick={openNeurons({
				checkoutReason: CheckoutReason.Chat,
				botClientId,
			})}
			className={withHover}
		>
			<ParticlesWrapper>
				<Particle style={{ '--i': 1 } as MyCustomCSS} className={animate1} />
				<Particle style={{ '--i': 2 } as MyCustomCSS} className={animate2} />
				<Particle style={{ '--i': 3 } as MyCustomCSS} className={animate3} />
			</ParticlesWrapper>
			<NeuronBtnFront>
				<NeuronBtnText align="left">Add neurons</NeuronBtnText>
				<NeuronBtnIcon>
					<Neurons size="medium">{formatCash(balance)}</Neurons>
					<Image
						width={25}
						height={24}
						src={'/img/neurons/gem-icon.png'}
						alt={'neuron image'}
						quality={100}
					/>
				</NeuronBtnIcon>
			</NeuronBtnFront>
		</NeuronBtnWrapper>
	);
};
