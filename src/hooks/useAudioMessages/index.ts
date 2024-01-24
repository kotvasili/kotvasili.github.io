import { isEqual } from '@react-hookz/deep-equal';
import { useCallback, useEffect, useState } from 'react';

import { CheckoutReason } from '~constants/annals';
import { usePayWallActionsContext, usePayWallContext } from '~context/paywall';
import { useCurrentBot } from '~hooks/useCurrentBot';
import {
	AudioMessage,
	AudioPlayer,
	AudioPlayerState,
} from '~services/audioPlayer';

import { useSelector } from '../../store';
import { getToken } from '../../store/auth/authSlice';

export const usePaidAudioMessagePlaying = (
	audioMessage: AudioMessage,
	botId: string
) => {
	const { hasSubscription } = usePayWallContext();
	const { openSubscription } = usePayWallActionsContext();
	const { bot } = useCurrentBot({ recipientId: botId });

	const {
		audioPlayingState,
		start: startPlayingAudio,
		stop,
	} = useAudioMessagePlaying(audioMessage);

	const start = useCallback(() => {
		if (hasSubscription) {
			startPlayingAudio();
		} else {
			openSubscription({
				botName: bot.name,
				checkoutReason: CheckoutReason.ListenAIAudio,
				botClientId: botId,
				cb: (success) => {
					if (success) {
						startPlayingAudio();
					}
				},
			})();
		}
	}, [bot.name, botId, hasSubscription, openSubscription, startPlayingAudio]);

	return {
		audioPlayingState,
		start,
		stop,
	};
};

const useAudioMessagePlaying = (audioMessage: AudioMessage) => {
	const [currentAudioMessage, setCurrentAudioMessage] = useState(
		AudioPlayer.shared.getAudioMessage()
	);

	const [currentPlayerState, setCurrentPlayerState] = useState(
		AudioPlayer.shared.getCurrentState()
	);

	useEffect(() => {
		const newAudioMessageHandler = (
			newAudioMessage: AudioMessage | undefined
		) => {
			setCurrentAudioMessage(newAudioMessage);
		};

		const newAudioState = (newState: AudioPlayerState) => {
			setCurrentPlayerState(newState);
		};

		// @ts-ignore
		AudioPlayer.shared.on('audioChanged', newAudioMessageHandler);
		// @ts-ignore
		AudioPlayer.shared.on('stateChanged', newAudioState);

		return () => {
			// @ts-ignore
			AudioPlayer.shared.removeListener('audioChanged', newAudioMessageHandler);
			// @ts-ignore
			AudioPlayer.shared.removeListener('stateChanged', newAudioState);
		};
	}, [setCurrentPlayerState, setCurrentAudioMessage]);

	const audioPlayingState =
		currentAudioMessage?.id === audioMessage.id &&
		currentAudioMessage?.sender === audioMessage.sender &&
		currentAudioMessage?.recipient === audioMessage.recipient
			? currentPlayerState
			: AudioPlayerState.IDLE;

	const token = useSelector(getToken);

	const start = useCallback(() => {
		AudioPlayer.shared.play(audioMessage, token);
	}, [audioMessage, token]);

	const stop = useCallback(() => {
		if (isEqual(currentAudioMessage, audioMessage)) {
			AudioPlayer.shared.pause();
		}
	}, [currentAudioMessage, audioMessage]);

	return {
		audioPlayingState,
		start,
		stop,
	};
};
