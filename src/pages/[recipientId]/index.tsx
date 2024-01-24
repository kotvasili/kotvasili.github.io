import { useDebouncedCallback } from '@react-hookz/web';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { BotChatBackgroundImage } from '~components/BotChatBackgroundImage';
import { ChatInput } from '~components/ConversationInput';
import { GiftFeed } from '~components/GiftFeed';
import { Loader } from '~components/Loader';
import MessageList from '~components/Messages/MessageList';
import { MessageListHeader } from '~components/Messages/MessageListHeader';
import {
	ConversationInner,
	ConversationLoader,
	ConversationOuter,
} from '~components/pages/Conversation.styles';
import { CheckoutReason } from '~constants/annals';
import { MESSAGES_COUNT } from '~constants/dialogs';
import { useAuthContext } from '~context/auth';
import { BotPayWallContextProvider } from '~context/botPaywall/provider';
import { useAnnalsCopyPaste } from '~hooks/annals';
import { useCurrentBot } from '~hooks/useCurrentBot';
import { useHackRemoveQueryToken } from '~hooks/useHackRemoveQueryToken';
import { useIOSKeyboardLock } from '~hooks/useIOSKeyboardLock';
import Layout from '~layouts/chat';
import {
	messagesAdapter,
	messagesSelector,
	useGetDialogsQuery,
	useGetMessagesQuery,
} from '~services/api/dialogs';

import ServerTokenHandler from '../../services/ServerTokenHandler';
import { wrappedStore } from '../../store';
import { IConversationQuery } from '../../types/pages';
import { NextPageWithLayout } from '../_app';

const BotIntro = dynamic(
	() => import('../../components/BotIntro').then((mod) => mod.BotIntro),
	{
		loading: () => null,
		ssr: false,
	}
);

const MemorisedMessagesToastContainer = memo(
	() => (
		<ToastContainer
			hideProgressBar
			containerId="messages-toast"
			enableMultiContainer
		/>
	),
	() => true
);
MemorisedMessagesToastContainer.displayName = 'MemorisedMessagesToastContainer';

const Conversation: NextPageWithLayout = () => {
	const { id } = useAuthContext();

	const [omit, setOmit] = useState(0);
	const { query, replace } = useRouter();
	const { recipientId } = query as IConversationQuery;
	const participantRef = useRef<string>(recipientId);
	const { botLoading } = useCurrentBot({ recipientId });

	useHackRemoveQueryToken();
	useAnnalsCopyPaste();

	useLayoutEffect(() => {
		setOmit(0);
		participantRef.current = recipientId;
	}, [recipientId]);

	const skip = participantRef.current !== recipientId && omit >= MESSAGES_COUNT;

	const {
		messages,
		isEnd,
		isLoading,
		currentData,
		isFetching,
		isError,
		isSuccess,
	} = useGetMessagesQuery(
		{
			recipientId,
			id,
			omit,
		},
		{
			skip,
			selectFromResult: ({ data, ...otherParams }) => {
				const messages = messagesSelector.selectAll(
					data?.messages ?? messagesAdapter.getInitialState()
				);
				const hasResponse = !!data?.receivedCount;
				const isEnd = hasResponse ? data.receivedCount < MESSAGES_COUNT : true;
				return {
					messages,
					isEnd,
					...otherParams,
				};
			},
		}
	);
	const {
		total,
		isLoading: totalLoading,
		isFetching: totalFetching,
		isSuccess: totalSuccess,
	} = useGetDialogsQuery(undefined, {
		skip,
		selectFromResult: ({ data, ...other }) => {
			const msg = data?.[+recipientId]?.message;

			return {
				total: data ? (msg && msg.total) || messages.length : messages.length,
				...other,
			};
		},
	});

	const isChatLoading =
		isLoading ||
		totalLoading ||
		//Fetching + no currentData === loading of new cache entry => we're navigating to the conversation that haven't been loaded yet
		(isFetching && currentData === undefined) ||
		totalFetching ||
		botLoading;

	const setMessageOffset = useDebouncedCallback(
		(isTopReached: boolean) => {
			if (isFetching) {
				return;
			}
			if (!isEnd && isTopReached) {
				setOmit(messages.length);
				return;
			}
		},
		[isEnd, messages.length],
		200
	);

	useEffect(() => {
		if (isError) {
			void replace('/');
		}
	}, [isError, replace]);

	const pageRef = useIOSKeyboardLock();

	return (
		<BotPayWallContextProvider
			recipientId={recipientId}
			messagesLength={messages?.length ?? 0}
			checkoutReason={CheckoutReason.Chat}
		>
			<ConversationOuter className="chat-container" ref={pageRef}>
				<ConversationInner>
					{isFetching && (
						<ConversationLoader>
							<Loader size={30} />
						</ConversationLoader>
					)}
					<MessageListHeader recipientId={recipientId} />
					{isChatLoading ? (
						<Loader />
					) : (
						<>
							<MemorisedMessagesToastContainer />
							<MessageList
								key={`${recipientId}-${id}`}
								userId={id}
								botId={recipientId}
								messages={messages}
								onScrollTop={setMessageOffset}
								total={total}
							/>
							<GiftFeed />
							<ChatInput recipientId={recipientId} />
						</>
					)}
				</ConversationInner>
				<BotChatBackgroundImage />
				{isSuccess && totalSuccess ? (
					//@ts-ignore
					<BotIntro
						messageCount={messages?.length}
						key={`${recipientId}-${id}-intro`}
					/>
				) : null}
			</ConversationOuter>
		</BotPayWallContextProvider>
	);
};

Conversation.displayName = 'Conversation';
Conversation.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export const getServerSideProps = wrappedStore.getServerSideProps(
	// eslint-disable-next-line @typescript-eslint/require-await
	(store) => async (ctx) => {
		const tokenHandler = new ServerTokenHandler(ctx, store);

		return tokenHandler.getRedirectResult();
	}
);

export default Conversation;
