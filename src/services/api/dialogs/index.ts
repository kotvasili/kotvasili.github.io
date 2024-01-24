import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

import { api } from '~services/api';
import type {
	TBotAvailabilityResponseRaw,
	TDialogResponse,
	TMessage,
	TMessageRequestBody,
	TParticipantsRawResponse,
} from '~services/api/dialogs/types';
import {
	TBotAvailabilityResponse,
	TBotConfigExtended,
	TParticipantResponseTransformed,
} from '~services/api/dialogs/types';
import { userApi } from '~services/api/user';
import {
	adaptAudioMessage,
	addEncodedTextFieldToMessage,
	addGifPath,
	transformChatsToDialogs,
	transformMessageBodyToMessage,
} from '~utils/messages';

import { RootState } from '../../../store';

const prefix = '/dialogs';

const messagesAdapter = createEntityAdapter({
	selectId: (item: TMessage) => item.tag,
	sortComparer: (a, b) => (a.id > b.id ? 1 : -1),
});

const messagesSelector = messagesAdapter.getSelectors();

export const dialogsApi = api.injectEndpoints({
	endpoints: (build) => ({
		getDialogs: build.query<TParticipantResponseTransformed, void>({
			async queryFn(_, _queryApi, _extraOptions, fetchWithBQ) {
				const { id } = (_queryApi.getState() as RootState).auth.info;
				//get bots, shop and history
				const [botsResponse, historyResponse, availabilityResponse] =
					await Promise.all([
						fetchWithBQ('/ai/configuration/bots'),
						fetchWithBQ(
							`/users/${id}/events?select=15&omit=0&types=%2Bmessage`
						),
						fetchWithBQ(`/ai/chats/userId/${id}`),
					]);
				const error =
					botsResponse.error ||
					historyResponse.error ||
					availabilityResponse.error;
				if (error) {
					return { error };
				}
				const availability = (
					availabilityResponse.data as TBotAvailabilityResponseRaw
				).chatList;

				const bots = botsResponse.data as TParticipantsRawResponse;
				const botsTransformed: TParticipantResponseTransformed = {};
				for (const key of Object.keys(bots)) {
					const botId = bots[key].clientId;
					const botAvailableInfo = availability.find(({ uid }) => {
						return key === uid;
					});
					if (botAvailableInfo) {
						botsTransformed[botId] = bots[key] as TBotConfigExtended;
						botsTransformed[botId].message = null;
						botsTransformed[botId].preConditions =
							botAvailableInfo?.conditions?.preCondition;
						botsTransformed[botId].postConditions =
							botAvailableInfo?.conditions?.postCondition;
					}
				}
				const history = transformChatsToDialogs(
					historyResponse.data as TDialogResponse[]
				);
				//get history for main bot separately
				const mainBotId = bots.main.clientId;
				const mainLastMessageResponse = await fetchWithBQ(
					`/ai/dialogs/messages/sender/${id}/recipient/${mainBotId}?omit=0&select=1`
				);
				if (mainLastMessageResponse.error)
					return {
						error: mainLastMessageResponse.error,
					};
				const mainLastMessage = mainLastMessageResponse.data;

				// if last message from response === null then bot was reset. Remove this message from history
				if (mainLastMessage === null) {
					const index = history.ids.indexOf(mainBotId.toString());
					history.ids.splice(index, 1);
					delete history.items[mainBotId];
				}

				Object.keys(botsTransformed).forEach((key) => {
					botsTransformed[+key].message = history.items[key] ?? null;
				});
				if (history.ids.length === 0) {
					void _queryApi.dispatch(
						userApi.endpoints.userAction.initiate({
							id,
							action: 'chat.examined',
							data: { User: bots.main.serverId },
						})
					);
				}

				return {
					data: botsTransformed,
				};
			},
		}),
		getBotsAvailability: build.query<TBotAvailabilityResponse, void>({
			async queryFn(_, _queryApi, _extraOptions, fetchWithBQ) {
				const { id } = (_queryApi.getState() as RootState).auth.info;
				const response = await fetchWithBQ(`/ai/chats/userId/${id}`);
				if (response.error)
					return {
						error: response?.error,
					};
				const data = response.data as TBotAvailabilityResponseRaw;
				return {
					data: data.chatList as TBotAvailabilityResponse,
				};
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data: res } = await queryFulfilled;
					dispatch(
						dialogsApi.util.updateQueryData('getDialogs', _, (draft) => {
							for (const key of Object.keys(draft)) {
								const botAvailableInfo = res.find(({ botId }) => {
									return key === botId;
								});
								if (botAvailableInfo) {
									draft[key].preConditions =
										botAvailableInfo?.conditions?.preCondition;
									draft[key].postConditions =
										botAvailableInfo?.conditions?.postCondition;
								}
							}
						})
					);
				} catch {}
			},
		}),
		getMessages: build.query<
			{ receivedCount: number; messages: EntityState<TMessage> },
			{
				id: string;
				recipientId: string;
				omit: number;
			}
		>({
			query: ({ id, recipientId, omit }) => ({
				url: `ai${prefix}/messages/sender/${id}/recipient/${recipientId}`,
				params: { omit, select: 30 },
				headers: {
					Accept: 'application/json+videos',
				},
			}),
			transformResponse: (response: TMessage[] | null) => {
				if (response === null) {
					return {
						receivedCount: 0,
						messages: messagesAdapter.getInitialState(),
					};
				}
				const transformed = response
					?.map(addEncodedTextFieldToMessage)
					.map(adaptAudioMessage)
					.map(addGifPath);

				const messages = messagesAdapter.addMany(
					messagesAdapter.getInitialState(),
					transformed
				);
				return {
					receivedCount: response.length,
					messages,
				};
			},
			forceRefetch: ({ currentArg, previousArg }) => {
				return currentArg?.omit !== previousArg?.omit;
			},
			serializeQueryArgs: ({ endpointName, queryArgs }) => {
				return `${endpointName}-${queryArgs?.recipientId}`;
			},
			merge: (currentState, incomingState) => {
				messagesAdapter.setAll(currentState.messages, [
					...messagesSelector.selectAll(incomingState.messages),
					...messagesSelector.selectAll(currentState.messages),
				]);
				currentState.receivedCount = incomingState.receivedCount;
			},
			providesTags: (result, error, { recipientId }) => [
				{ type: 'conversation' as const, id: recipientId },
			],
		}),
		sendMessage: build.mutation<
			TMessage[],
			{ id: string; recipientId: string; message: TMessageRequestBody }
		>({
			query: ({ id, recipientId, message }) => ({
				url: `${prefix}/messages/sender/${id}/recipient/${recipientId}`,
				method: 'POST',
				body: message,
			}),
			onQueryStarted(
				{ id, recipientId, message },
				{ dispatch, queryFulfilled }
			) {
				const messagePatch = dispatch(
					dialogsApi.util.updateQueryData(
						'getMessages',
						{ id, recipientId, omit: 0 },
						(draft) => {
							const lastTag = messagesSelector.selectIds(draft.messages)[
								messagesSelector.selectTotal(draft.messages) - 1
							];
							const prevId =
								messagesSelector.selectById(draft.messages, lastTag)?.id || 0;

							const msg = transformMessageBodyToMessage(
								message,
								id,
								recipientId,
								prevId
							);
							messagesAdapter.addOne(draft.messages, msg);
						}
					)
				);
				const dialogPatch = dispatch(
					dialogsApi.util.updateQueryData('getDialogs', undefined, (draft) => {
						const bot = Object.values(draft).find(
							({ clientId }) => clientId === +recipientId
						);
						if (!bot) {
							return;
						}
						bot.message = Object.assign(
							bot.message ?? { total: 0, unreadCount: 0 },
							{
								senderId: id,
								lastMessage: message.text,
								paid: true,
								timestamp: Date.now(),
							}
						);
						bot.message.total++;
					})
				);

				queryFulfilled.catch(() => {
					messagePatch.undo();
					dialogPatch.undo();
				});
			},
		}),
		buyMessage: build.mutation<
			{ Success: boolean; Data: { Text: string } },
			{ id: string; recipientId: string; messageId: number }
		>({
			query: ({ id, recipientId, messageId }) => ({
				url: `${prefix}/messages/sender/${recipientId}/recipient/${id}/${messageId}/buy`,
				method: 'POST',
			}),
			async onQueryStarted(
				{ id, recipientId, messageId },
				{ dispatch, queryFulfilled }
			) {
				try {
					const { data: res } = await queryFulfilled;
					if (!res.Success) return;
					const text = res.Data.Text;
					dispatch(
						dialogsApi.util.updateQueryData(
							'getMessages',
							{ id, recipientId, omit: 0 },
							(draft) => {
								const message = messagesSelector
									.selectAll(draft.messages)
									.find(({ id }) => id === messageId);
								if (!message) return;
								messagesAdapter.updateOne(draft.messages, {
									id: message.tag,
									changes: {
										text,
										meta: {
											...message.meta,
											tariffication: {
												...message.meta?.tariffication,
												paid: true,
												final: true,
												cost: 0,
											},
										},
									},
								});
							}
						)
					);
					dispatch(
						dialogsApi.util.updateQueryData(
							'getDialogs',
							undefined,
							(draft) => {
								const bot = Object.values(draft).find(
									({ clientId }) => clientId === +recipientId
								);
								if (bot?.message?.id !== messageId) {
									return;
								}
								bot.message.paid = true;
								bot.message.cost = 0;
							}
						)
					);
				} catch {}
			},
		}),
		getImageSrc: build.query<string, { url: string }>({
			query: ({ url }) => ({
				url,
				responseHandler: async (response) => {
					try {
						const blob = await response.blob();
						return URL.createObjectURL(blob);
					} catch {
						return '';
					}
				},
			}),
		}),
	}),
});

export const {
	useGetMessagesQuery,
	useSendMessageMutation,
	useGetDialogsQuery,
	useBuyMessageMutation,
	useGetBotsAvailabilityQuery,
	useGetImageSrcQuery,
} = dialogsApi;

export { messagesAdapter, messagesSelector };
