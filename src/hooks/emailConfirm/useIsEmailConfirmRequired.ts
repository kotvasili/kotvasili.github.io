import { tags } from '~constants/userTags';
import { useUserTags } from '~hooks/useTags';

export const useIsEmailConfirmRequired = () => {
	const { userTags, isLoading } = useUserTags();
	const isConfirmRequired = userTags.includes(tags.emailConfirmRequired);
	return [isConfirmRequired, isLoading];
};
