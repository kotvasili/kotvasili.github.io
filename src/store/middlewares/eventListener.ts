import { createListenerMiddleware } from '@reduxjs/toolkit';

import { Toaster } from '~components/Toaster';
import { GTMAnalytics } from '~services/analytics';
import { authApi } from '~services/api/auth';
import {
	dialogsApi,
	messagesAdapter,
	messagesSelector,
} from '~services/api/dialogs';
import { userApi } from '~services/api/user';
import { wsEvents } from '~services/websocket';
import { isEventType, WsEventType } from '~services/websocket/types';
import {
	adaptAudioMessage,
	addEncodedTextFieldToMessage,
	addGifPath,
	processLastMessageText,
} from '~utils/messages';

import { AppDispatch, RootState } from '../index';

export const wsEventListener = createListenerMiddleware();

wsEventListener.startListening({
	matcher: authApi.endpoints.authenticate.matchFulfilled,
	effect: (action, listenerApi) => {
		if (typeof window === 'undefined') {
			return;
		}
		const userId = (listenerApi.getState() as RootState).auth.info.id;
		GTMAnalytics.setUserId(userId);

		listenerApi.unsubscribe();
		wsEvents.events$.subscribe((event) => {
			if (isEventType(event, WsEventType.LevelChanged)) {
				const data = event.payload;
				const tag = data.changes.reason.messageTag;
				const elem = document.getElementById(tag);
				if (elem) {
					elem.dataset.exp = `+${data.changes.experienceChanged}`;
				}
				listenerApi.dispatch(
					userApi.util.updateQueryData('getLevel', undefined, (draft) => {
						Object.assign(draft ?? {}, data.current);
					}) as AppDispatch
				);
				if (data.changes.levelChangedMessage) {
					Toaster.showLevelMessage({ text: data.changes.levelChangedMessage });
				}
			}
			if (isEventType(event, WsEventType.ChatMessageReceived)) {
				const data = event.payload;
				const encodedMessage = addEncodedTextFieldToMessage(data);
				const { id, text, meta, recipient, sender, timestamp } = encodedMessage;
				const isOwn = sender === userId;
				const botId = isOwn ? recipient : sender;
				const lastMessage = processLastMessageText(text, meta);
				const encodedLastMessage = processLastMessageText(
					encodedMessage.encodedText as string,
					meta
				);
				listenerApi.dispatch(
					dialogsApi.util.updateQueryData('getDialogs', undefined, (draft) => {
						const bot = Object.values(draft).find(
							({ clientId }) => clientId === +botId
						);
						if (!bot) {
							return;
						}

						let { total = 0, unreadCount = 0 } = bot.message ?? {};
						// FIXME: code bomb! some other page path can have bot id in future
						const botPageOpened = window.location.pathname.includes(botId);

						// if isOwn then total was updated during sendMessage
						total += isOwn ? 0 : 1;
						unreadCount += isOwn || botPageOpened ? 0 : 1;

						bot.message = {
							total,
							unreadCount,
							id,
							timestamp,
							senderId: sender,
							lastMessage,
							encodedLastMessage,
							tarifficationType: meta?.tariffication?.type,
							paid: meta?.tariffication?.paid ?? false,
							cost: meta?.tariffication?.cost ?? 0,
						};
					}) as AppDispatch
				);
				listenerApi.dispatch(
					dialogsApi.util.updateQueryData(
						'getMessages',
						{ id: userId, recipientId: botId, omit: 0 },
						(draft) => {
							const existingMsg = messagesSelector.selectById(
								draft.messages,
								data.tag
							);
							if (existingMsg) {
								messagesAdapter.updateOne(draft.messages, {
									id: existingMsg.tag,
									changes: addGifPath(adaptAudioMessage(data)),
								});
							} else {
								messagesAdapter.addOne(
									draft.messages,
									addGifPath(adaptAudioMessage(encodedMessage))
								);
							}
						}
					) as AppDispatch
				);
			}
			if (
				isEventType(
					event,
					WsEventType.ChatBecomeAvailable,
					WsEventType.ChatBecomeUnavailable
				)
			) {
				void listenerApi.dispatch(
					dialogsApi.endpoints.getBotsAvailability.initiate(undefined, {
						forceRefetch: true,
					})
				);

				const {
					auth: {
						info: { id },
					},
				} = listenerApi.getState() as RootState;

				void listenerApi.dispatch(
					dialogsApi.endpoints.getMessages.initiate(
						{ id, recipientId: event.payload.botId, omit: 0 },
						{
							forceRefetch: true,
						}
					)
				);
			}
		});
	},
});
