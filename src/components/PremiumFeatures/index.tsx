import { FC, useCallback, useMemo, useState } from 'react';

import { Loader } from '~components/Loader';
import {
	PremiumAccordion,
	PremiumContainer,
	PremiumExpander,
	PremiumList,
	PremiumListItem,
} from '~components/PremiumFeatures/PremiumFeatures.styles';
import { P } from '~components/Typography';
import { useGetSubscriptionBenefitsQuery } from '~services/api/subscriptions';

import { useSelector } from '../../store';
import { getUserId } from '../../store/auth/authSlice';

type TPremiumFeaturesProps = {
	small?: boolean;
	botId?: number | string;
	botName?: string;
};
export const PremiumFeatures: FC<TPremiumFeaturesProps> = ({
	small = false,
	botId = '',
	botName,
}) => {
	const id = useSelector(getUserId);
	const [open, setOpen] = useState(false);
	const {
		data = { benefits: [] },
		isLoading,
		isSuccess,
	} = useGetSubscriptionBenefitsQuery(
		{
			id,
			botId,
		},
		{
			skip: !botId,
		}
	);
	const hasFeatures = useMemo(
		() => isSuccess && data.benefits.length > 0,
		[data.benefits.length, isSuccess]
	);

	const hasSecondList = useMemo(
		() => hasFeatures && !!data.benefits[1],
		[hasFeatures] //eslint-disable-line
	);
	const transformTitle = useCallback(
		(title: string) =>
			title.replace(botName ? '{botName}' : '', botName ? `${botName}'s` : ''),
		[botName]
	);

	const secondList = hasSecondList
		? data.benefits[1]?.items?.map((feature) => (
				<PremiumListItem key={feature.title}>
					{transformTitle(feature.title)}
				</PremiumListItem>
		  ))
		: null;

	return (
		<PremiumContainer>
			{small ? null : (
				<P size={'medium'} align={'left'} transform="uppercase" transparent>
					Premium features
				</P>
			)}
			{isLoading ? <Loader size={30} /> : null}
			<PremiumList small={small}>
				{hasFeatures
					? data.benefits[0].items.map((feature) => (
							<PremiumListItem key={feature.title}>
								{transformTitle(feature.title)}
							</PremiumListItem>
					  ))
					: null}
				{hasSecondList ? (
					small ? (
						<>
							<PremiumAccordion open={open} small={small}>
								{secondList}
							</PremiumAccordion>
							<PremiumExpander
								size="small"
								onClick={() => setOpen((prev) => !prev)}
							>
								{open ? 'Hide benefits' : 'Show all benefits'}
							</PremiumExpander>
						</>
					) : (
						secondList
					)
				) : null}
			</PremiumList>
		</PremiumContainer>
	);
};
