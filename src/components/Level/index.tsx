import { useMemo } from 'react';

import {
	LevelLvl,
	LevelProgress,
	LevelRow,
	LevelWrapper,
} from '~components/Level/LevelStyles';
import { useGetLevelQuery } from '~services/api/user';

export const variants = {
	show: {
		opacity: 1,
		y: 0,
		transition: {
			ease: 'easeOut',
			duration: 0.3,
		},
	},
	hide: {
		y: -20,
		opacity: 0,
	},
};
export const Level = () => {
	const { data, isSuccess } = useGetLevelQuery();
	const progress = useMemo(
		() =>
			isSuccess
				? ((data?.currentPoints || 0) / (data?.nextLevelPoints || 0)) * 100
				: 0,
		[data?.currentPoints, data?.nextLevelPoints, isSuccess]
	);
	return isSuccess && data ? (
		<LevelWrapper
			key={data.level}
			variants={variants}
			animate="show"
			initial="hide"
		>
			<LevelLvl>lvl {data.level}</LevelLvl>
			<LevelRow>
				<LevelProgress progress={progress} />
			</LevelRow>
		</LevelWrapper>
	) : null;
};
