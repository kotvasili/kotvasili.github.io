import { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';

import {
	BotContentBlock,
	BotDescriptionContainer,
	BotDescriptionP,
	BotInluencerHead,
} from '~components/BotCards/BotPaymentCard/BotPaymentCard.styles';
import { Interests } from '~components/Interests';
import { H1, P } from '~components/Typography';
import { TBotAccountType } from '~services/api/dialogs/types';
import { TBotInterests } from '~services/api/user/types';

import TickSimple from '../../../../../public/assets/icons/tick-simple.svg';

export type TBotDescription = {
	name: string;
	title?: string;
	description?: string;
	interests?: TBotInterests;
	type: TBotAccountType;
};
export const BotDescription: FC<TBotDescription> = ({
	name,
	type,
	description,
	interests,
}) => {
	const isInfluencer = type === 'influencer';
	const baseTitle = `Meet ${name}`;
	const [size, setExpanded] = useState({ height: '5.2em', className: '' });
	const textRef = useRef<HTMLParagraphElement>(null);

	const open = useCallback((height: string) => {
		setExpanded({ height, className: 'open' });
	}, []);

	useLayoutEffect(() => {
		const content = textRef.current;
		if (!content || !window) return;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const computedStyle = window.getComputedStyle(content);
		if (
			parseInt(computedStyle.height) <=
			4 * parseInt(computedStyle.lineHeight)
		) {
			open(computedStyle.height);
		}
	}, [open]);

	return (
		<BotContentBlock>
			{isInfluencer ? (
				<BotInluencerHead>
					<TickSimple />
					<P size="small" align="left">
						Digital Duplicate
					</P>
				</BotInluencerHead>
			) : null}
			<H1 multiline={isInfluencer}>
				{isInfluencer ? (
					<>
						{name}
						{'\n'} Premium access
					</>
				) : (
					baseTitle
				)}
			</H1>
			<Interests interests={interests} />

			<BotDescriptionContainer
				maxHeight={size.height}
				className={size.className}
				onClick={() =>
					open(`${textRef?.current?.getBoundingClientRect()?.height ?? 72}px`)
				}
			>
				<BotDescriptionP ref={textRef} size="large">
					{isInfluencer && description
						? 'The exclusive access to hot content and endless adventures with your favorite model'
						: description}
				</BotDescriptionP>
			</BotDescriptionContainer>
		</BotContentBlock>
	);
};
