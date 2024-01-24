import Lottie from 'lottie-react';
import type { FC } from 'react';
import { memo, useCallback } from 'react';

import { usePayWallContext } from '~context/paywall';
import { usePaidAudioMessagePlaying } from '~hooks/useAudioMessages';
import type { TMessage } from '~services/api/dialogs/types';
import { AudioMessage, AudioPlayerState } from '~services/audioPlayer';

import Lock from '../../../../../public/assets/icons/Lock.svg';
import AudioLoading from '../../../../../public/img/audio-message/AudioLoading.svg';
import animationAudio from '../../../../../public/img/audio-message/histograms/animation_audio.json';
import Histogram from '../../../../../public/img/audio-message/histograms/audio_static_4.svg';
import PauseImage from '../../../../../public/img/audio-message/Pause.svg';
import PlayImage from '../../../../../public/img/audio-message/Play.svg';
import {
	IconWrapper,
	LoadingWrapper,
	LockImageWrapper,
	MessageAudioWrapper,
} from './AudioMessage.styles';

export const AudioMessageComponent: FC<{
	message: TMessage;
	botId: string;
}> = ({ message, botId }) => {
	const { hasSubscription } = usePayWallContext();
	const data = message.meta?.reference?.split(':') || [];

	const audioMessage: AudioMessage = {
		sender: message.sender,
		recipient: message.recipient,
		id: message.id,
		reference: message.meta?.hasAudio ? data[1] : undefined,
	};
	const { start, stop, audioPlayingState } = usePaidAudioMessagePlaying(
		audioMessage,
		botId
	);

	const audioButtonClicked = useCallback(() => {
		switch (audioPlayingState) {
			case AudioPlayerState.Playing:
				stop();
				return;
			case AudioPlayerState.Loading:
				// Intended no-op
				return;
			case AudioPlayerState.IDLE:
			case AudioPlayerState.Paused:
				start();
				return;
		}
	}, [start, stop, audioPlayingState]);

	const icon = (
		<AudioIcon
			audioButtonClicked={audioButtonClicked}
			audioPlayingState={audioPlayingState}
		/>
	);

	return (
		<MessageAudioWrapper>
			{!hasSubscription && (
				<LockImageWrapper>
					<Lock />
				</LockImageWrapper>
			)}
			{icon}
			{audioPlayingState === AudioPlayerState.Playing ? (
				<Lottie
					width={96}
					height={41}
					animationData={animationAudio}
					loop={true}
					style={{ marginTop: 5, maxWidth: '96px', maxHeight: '41px' }}
				/>
			) : (
				<Histogram />
			)}
		</MessageAudioWrapper>
	);
};

const AudioIcon = memo(
	({
		audioPlayingState,
		audioButtonClicked,
	}: {
		audioPlayingState: AudioPlayerState;
		audioButtonClicked: () => void;
	}) => {
		switch (audioPlayingState) {
			case AudioPlayerState.Playing:
				return (
					<IconWrapper onClick={audioButtonClicked}>
						<PauseImage />
					</IconWrapper>
				);
			case AudioPlayerState.Loading:
				return (
					<LoadingWrapper onClick={audioButtonClicked}>
						<AudioLoading />
					</LoadingWrapper>
				);
			case AudioPlayerState.IDLE:
			case AudioPlayerState.Paused:
				return (
					<IconWrapper onClick={audioButtonClicked}>
						<PlayImage />
					</IconWrapper>
				);
		}
	}
);
AudioIcon.displayName = 'AudioIcon';
