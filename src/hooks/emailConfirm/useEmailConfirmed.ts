import { tags } from '~constants/userTags';
import { useUserTags } from '~hooks/useTags';

export const useEmailConfirmed = (): [boolean, boolean] => {
	const { userTags, isLoading } = useUserTags();
	const confirmed = userTags.includes(tags.emailConfirmed);
	return [confirmed, isLoading];
};
