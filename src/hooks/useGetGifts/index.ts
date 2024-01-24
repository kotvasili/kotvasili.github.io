import { useUserId } from '~hooks/useUserId';
import { useGetGiftsQuery } from '~services/api/gifts';

export const useGetGifts = (botId: string) => {
	const userId = useUserId();
	return useGetGiftsQuery({ userId, botId });
};
