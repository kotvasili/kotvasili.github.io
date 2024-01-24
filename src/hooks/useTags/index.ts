import { useMemo } from 'react';

import { useExperimentsQuery, useTagsQuery } from '~services/api/user';

import { useSelector } from '../../store';
import { getUserId } from '../../store/auth/authSlice';

export const useUserTags = () => {
	const id = useSelector(getUserId);
	const { data: tags = [], isLoading: tagsLoading } = useTagsQuery({ id });
	const { data: experiments = [], isLoading: experimentsLoading } =
		useExperimentsQuery({ id });
	const isLoading = useMemo(
		() => tagsLoading || experimentsLoading,
		[experimentsLoading, tagsLoading]
	);
	const userTags = useMemo(
		() => [...experiments, ...tags],
		[experiments, tags]
	);
	return { isLoading, userTags, id };
};
