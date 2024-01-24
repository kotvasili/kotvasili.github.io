import { tags } from '~constants/userTags';
import { api } from '~services/api';
import { dialogsApi } from '~services/api/dialogs';
import type {
	TBotInfo,
	TUserExperiments,
	TUserInfo,
	TUserTags,
} from '~services/api/user/types';
import { TBotIntroSlides, TUserLevel } from '~services/api/user/types';
import { wsEvents } from '~services/websocket';
import { isEventType, WsEventType } from '~services/websocket/types';

import { RootState } from '../../../store';

const prefix = '/users';

export const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		userInfo: build.query<TUserInfo, { id: string }>({
			query: ({ id }) => ({ url: `${prefix}/private/${id}` }),
		}),
		editUserInfo: build.mutation<
			undefined,
			{ id: string; data: Pick<TUserInfo, 'gender' | 'name' | 'birthday'> }
		>({
			query: ({ id, data }) => ({
				url: `${prefix}/${id}`,
				method: 'PATCH',
				body: data,
			}),
			async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
				const infoPatch = dispatch(
					userApi.util.updateQueryData('userInfo', { id }, (draft) => {
						draft.gender = data.gender;
						draft.name = data.name;
						draft.birthday = data.birthday;
					})
				);
				try {
					await queryFulfilled;
				} catch {
					infoPatch.undo();
				}
			},
		}),
		tags: build.query<TUserTags, { id: string }>({
			query: ({ id }) => ({ url: `${prefix}/${id}/tags` }),
			async onCacheEntryAdded(
				{},
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
			) {
				// create subscription
				let eventSub = null;
				try {
					await cacheDataLoaded;

					eventSub = wsEvents.events$.subscribe((event) => {
						if (isEventType(event, WsEventType.UserTagSet)) {
							const tag = event.payload.tag;
							updateCachedData((draft) => {
								draft.push(tag);
							});
							if (tag === tags.subscription) {
								dispatch(api.util.invalidateTags(['subscriptions']));
							}
						}
						if (isEventType(event, WsEventType.UserTagUnset)) {
							updateCachedData((draft) => {
								const tag = event.payload.tag;
								const indexOfTag = draft.indexOf(tag);
								draft.splice(indexOfTag, 1);
							});
						}
					});
				} catch (err) {}

				await cacheEntryRemoved;
				eventSub?.unsubscribe();
			},
		}),
		experiments: build.query<TUserExperiments, { id: string }>({
			query: ({ id }) => ({ url: `${prefix}/${id}/tags/experiments` }),
		}),
		botInfo: build.query<TBotInfo, { id: string }>({
			query: ({ id }) => ({ url: `/ai${prefix}/${id}/preferences` }),
			async onQueryStarted(_, { queryFulfilled, dispatch }) {
				try {
					const { data: mainBotInfo } = await queryFulfilled;
					dispatch(
						dialogsApi.util.updateQueryData(
							'getDialogs',
							undefined,
							(draft) => {
								const bots = Object.values(draft);
								const mainBot = bots.find(({ uid }) => uid === 'main');
								if (!mainBot) {
									return;
								}
								mainBot.name = mainBotInfo.name;
							}
						)
					);
				} catch {}
			},
		}),
		getLevel: build.query<TUserLevel, void>({
			async queryFn(_, _queryApi, _extraOptions, fetchWithBQ) {
				const { id } = (_queryApi.getState() as RootState).auth.info;
				const response = await fetchWithBQ(`/ai${prefix}/${id}/experience`);
				if (response.error && response.error.status !== 400)
					return {
						error: response?.error,
					};
				const data = (response?.data || null) as TUserLevel;
				return {
					data,
				};
			},
		}),
		userAction: build.mutation<
			undefined,
			{ id: string; action: string; data: Record<string, unknown> }
		>({
			query: ({ id, action, data }) => ({
				url: `${prefix}/${id}/actions/${action}`,
				method: 'POST',
				body: data,
			}),
		}),
		setBotSubscription: build.mutation<undefined, { id: string }>({
			query: ({ id }) => ({
				url: `/ai/chats/${id}/configure`,
				method: 'POST',
				body: {
					features: ['subscription-bot'],
				},
			}),
		}),
		userOnboarding: build.mutation<
			undefined,
			{ id: string; data: Record<string, unknown> }
		>({
			query: ({ id, data }) => ({
				url: `/ai${prefix}/${id}/onboarding-answers`,
				method: 'PATCH',
				body: data,
			}),
		}),
		botInfoSlides: build.query<TBotIntroSlides, void>({
			query: () => ({ url: `/ai/configuration/bots/slides` }),
		}),
		userDelete: build.mutation<unknown, { userId: string }>({
			query: ({ userId }) => ({
				url: `${prefix}/${userId}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useUserInfoQuery,
	useExperimentsQuery,
	useTagsQuery,
	useGetLevelQuery,
	useBotInfoQuery,
	useBotInfoSlidesQuery,
	useEditUserInfoMutation,
	useUserActionMutation,
	useUserDeleteMutation,
	useSetBotSubscriptionMutation,
} = userApi;
