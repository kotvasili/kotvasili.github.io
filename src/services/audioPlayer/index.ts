import { isEqual } from '@react-hookz/deep-equal';
import { Howl } from 'howler';
import mitt, { Handler } from 'mitt';
import { env } from 'next-runtime-env';

export type AudioMessage = {
	sender: string;
	recipient: string;
	id: number;
	reference?: string;
};

export enum AudioPlayerState {
	IDLE,
	Loading,
	Paused,
	Playing,
}

type Events = {
	audioChanged: AudioMessage | undefined;
	stateChanged: AudioPlayerState | undefined;
};

export class AudioPlayer {
	static shared = new AudioPlayer();
	private player: Howl | undefined = undefined;
	private emitter = mitt<Events>();

	private audioMessage: AudioMessage | undefined = undefined;
	private currentState: AudioPlayerState = AudioPlayerState.IDLE;

	getAudioMessage(): AudioMessage | undefined {
		return this.audioMessage;
	}

	getCurrentState(): AudioPlayerState {
		return this.currentState;
	}

	play = (audioMessage: AudioMessage, token: string) => {
		if (this.player && isEqual(audioMessage, this.audioMessage)) {
			this.player?.play();
			return;
		}

		this.player?.stop();

		if (token) {
			const endpoint =
				env('NEXT_PUBLIC_PUBLIC_API') ?? window.location.hostname;

			const src = audioMessage.reference
				? `${endpoint}/media/static${audioMessage.reference}`
				: `${endpoint}/dialogs/messages/sender/${audioMessage.sender}/recipient/${audioMessage.recipient}/${audioMessage.id}/audio-ai`;

			const howl: Howl = new Howl({
				xhr: {
					headers: {
						Authorization: `Token token="${token}"`,
					},
					withCredentials: true,
				},
				format: ['mp3'],
				src: [src],
			});
			this.setCurrentState(AudioPlayerState.Loading);
			this.setAudioMessage(audioMessage);

			howl.on('playerror', () => {
				this.setCurrentState(AudioPlayerState.IDLE);
			});

			howl.on('play', () => {
				this.setCurrentState(AudioPlayerState.Playing);
			});
			howl.on('end', () => {
				this.setCurrentState(AudioPlayerState.IDLE);
			});
			howl.on('loaderror', () => {
				this.setCurrentState(AudioPlayerState.IDLE);
			});

			howl.play();
			this.player = howl;
		}
	};

	private setCurrentState(state: AudioPlayerState) {
		if (state === AudioPlayerState.IDLE) {
			this.audioMessage = undefined;
		}
		this.currentState = state;
		this.emitter.emit('stateChanged', state);
	}

	private setAudioMessage(audioMessage: AudioMessage | undefined) {
		this.audioMessage = audioMessage;
		this.emitter.emit('audioChanged', audioMessage);
	}

	pause = () => {
		this.player?.pause();
		this.setCurrentState(AudioPlayerState.Paused);
	};

	on(
		type: keyof Events,
		handler: Handler<AudioMessage | AudioPlayerState | undefined>
	) {
		return this.emitter.on(type, handler);
	}

	removeListener(
		type: keyof Events,
		handler: Handler<AudioMessage | AudioPlayerState | undefined>
	): void {
		return this.emitter.off(type, handler);
	}
}
