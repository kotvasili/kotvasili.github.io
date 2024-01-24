import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect } from 'react';

import {
	BotActionWrapper,
	BotContentBlock,
} from '~components/BotCards/BotPaymentCard/BotPaymentCard.styles';
import { Button } from '~components/Button';
import { Divider } from '~components/Divider';
import { DiscountBadge } from '~components/Typography';
import { CheckoutReason } from '~constants/annals';
import { useAuthContext } from '~context/auth';
import { usePayWallActionsContext, usePayWallContext } from '~context/paywall';
import { useBuyBotMutation } from '~services/api/credits';
import { useGetBotsAvailabilityQuery } from '~services/api/dialogs';
import { TBotPaymentOptionType } from '~services/api/dialogs/types';
import { TBotPaymentOptionsFormatted } from '~utils/payments';

export const BotActions: FC<
	TBotPaymentOptionsFormatted & {
		botId: string | number;
		onSuccess: () => void;
		name: string;
		promo?: boolean;
		checkoutReason: CheckoutReason;
	}
> = ({
	options,
	paymentOptionTypes,
	botId,
	onSuccess,
	name,
	checkoutReason,
}) => {
	const [buy, { isLoading: buyBotForNeuronsProcessing, isSuccess }] =
		useBuyBotMutation();
	const { isLoading: availabilityLoading } = useGetBotsAvailabilityQuery();

	const { id } = useAuthContext();
	const { balance } = usePayWallContext();
	const { openNeurons } = usePayWallActionsContext();
	const { replace } = useRouter();
	const buyCb = useCallback(
		(type: TBotPaymentOptionType) => () => {
			void buy({
				id,
				botId,
				type,
			});
		},
		[botId, buy, id]
	);

	useEffect(() => {
		if (isSuccess && !availabilityLoading) {
			onSuccess();
			setTimeout(() => {
				void replace(`/${botId}`);
			}, 100);
		}
	}, [availabilityLoading, botId, isSuccess, onSuccess, replace]);

	const btnCallback = useCallback(
		(isNeurons: boolean, cost: number, option: TBotPaymentOptionType) => {
			if (isNeurons && balance < cost) {
				return openNeurons({
					title: `Add neurons to unlock ${name}`,
					checkoutReason,
					botClientId: botId,
					cost,
				});
			}
			return buyCb(option);
		},
		[balance, botId, buyCb, checkoutReason, name, openNeurons]
	);

	return (
		<BotContentBlock gap={0}>
			{paymentOptionTypes.map((option, index) => {
				const isLevel = option === 'level';
				const currentOption = options[option];
				const isNeurons = option === 'neurons';
				const btnType = isLevel ? 'secondary' : 'primary';
				const isSingleOption = paymentOptionTypes.length === 1;
				const children = isNeurons ? (
					<>
						{isSingleOption && isNeurons ? (
							<>
								<span>Unlock for</span>
								<span className="crossed">{currentOption.value * 2}</span>
								<span>{currentOption.value}</span>
							</>
						) : null}
						<Image
							width={25}
							height={24}
							src={'/img/neurons/gem-icon.png'}
							alt={'neuron image'}
							quality={100}
						/>
					</>
				) : null;

				if (isLevel) {
					return (
						<Button
							key={option}
							type="secondary"
							text={currentOption.textPurchaseInitial}
						/>
					);
				}
				return (
					<BotActionWrapper key={option}>
						{isSingleOption && isNeurons ? (
							<DiscountBadge>Save 50%</DiscountBadge>
						) : null}
						{index > 0 ? (
							<Divider text="or" maxWidth={200} key={`${option}-divider`} />
						) : null}
						<Button
							type={btnType}
							text={
								isSingleOption && isNeurons
									? ''
									: currentOption.textPurchaseInitial
							}
							onClick={btnCallback(isNeurons, currentOption.value, option)}
							disabled={buyBotForNeuronsProcessing || availabilityLoading}
							loading={buyBotForNeuronsProcessing || availabilityLoading}
						>
							{children}
						</Button>
					</BotActionWrapper>
				);
			})}
		</BotContentBlock>
	);
};
