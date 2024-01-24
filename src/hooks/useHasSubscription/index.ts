import { tags } from '~constants/userTags';
import { useUserTags } from '~hooks/useTags';

export const useHasSubscription = () => {
	const { userTags } = useUserTags();
	return userTags.includes(tags.subscription);
};
