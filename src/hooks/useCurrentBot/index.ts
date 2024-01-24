import { useGetDialogsQuery } from '~services/api/dialogs';

export const useCurrentBot = ({
	recipientId,
}: {
	recipientId: string | number;
}) => {
	const { data, isSuccess, isLoading } = useGetDialogsQuery(undefined, {
		selectFromResult: ({ data, ...other }) => {
			const resp = data ?? {};
			return {
				data: resp[+recipientId] ?? {},
				...other,
			};
		},
		skip: !recipientId,
	});
	return { botSuccess: isSuccess, bot: data, botLoading: isLoading };
};
