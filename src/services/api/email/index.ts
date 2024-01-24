import { tags } from '~constants/userTags';
import { api } from '~services/api';
import { userApi } from '~services/api/user';

import { RootState } from '../../../store';

export const emailApi = api.injectEndpoints({
	endpoints: (build) => ({
		sendEmailConfirmation: build.mutation<unknown, { userId: string }>({
			query: ({ userId }) => ({
				url: `/reminders/${userId}`,
				method: 'POST',
				body: {
					type: 'email-confirmation',
				},
			}),
		}),
		confirmEmail: build.mutation<unknown, { token: string }>({
			query: ({ token }) => ({
				url: `/notifications/confirmation/electronicmail`,
				method: 'PATCH',
				body: JSON.stringify(token),
				headers: {
					'content-type': 'application/json',
				},
			}),
			async onQueryStarted(_, { queryFulfilled, dispatch, getState }) {
				try {
					await queryFulfilled;
					const id = (getState() as RootState).auth.info.id;
					dispatch(
						userApi.util.updateQueryData('tags', { id }, (draft) => {
							draft.push(tags.emailConfirmed);
						})
					);
				} catch {}
			},
		}),
	}),
});

export const { useSendEmailConfirmationMutation, useConfirmEmailMutation } =
	emailApi;
