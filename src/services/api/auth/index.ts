import { api } from '~services/api';

const prefix = '/identity';

export type TAuthUserInfo = {
	email: string;
	id: string;
};
export const authApi = api.injectEndpoints({
	endpoints: (build) => ({
		authenticate: build.query<TAuthUserInfo, void>({
			query: () => ({ url: prefix }),
		}),
		changeEmail: build.mutation<unknown, { email: string }>({
			query: ({ email }) => ({
				url: `${prefix}`,
				method: 'PATCH',
				body: { email },
			}),
			async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					dispatch(
						authApi.util.updateQueryData('authenticate', undefined, (draft) => {
							draft.email = email;
						})
					);
				} catch {}
			},
		}),
	}),
	overrideExisting: false,
});

export const { useAuthenticateQuery, useChangeEmailMutation } = authApi;
export const { authenticate } = authApi.endpoints;
export const {
	util: { getRunningQueriesThunk, getRunningMutationsThunk },
} = authApi;
