import { DateTime } from 'luxon';

import type {
	TDialogResponse,
	TDialogsState,
	TDialogStateItems,
	TMessage,
	TMessageRequestBody,
	TParticipantResponseTransformed,
} from '~services/api/dialogs/types';
import {
	TMessageMeta,
	TParticipantsResponse,
} from '~services/api/dialogs/types';
import { getRandomInt } from '~utils/numbers';

export const buildMessageFromString = (
	message: string,
	id: string,
	payload?: {
		reference: string;
		meta: TMessageRequestBody['meta'];
	}
): TMessageRequestBody => {
	const tag = `${id}_${Date.now() + getRandomInt()}`;
	const text = message.replace(/^\s+|\s+$|\s+(?=\s)/g, '');

	const msg = {
		tag,
		meta: payload?.meta || null,
		instant: 1,
		text,
		reference: payload?.reference,
	};

	if (!payload?.meta?.gift) {
		delete msg['reference'];
	}

	return msg;
};

export const transformMessageBodyToMessage = (
	message: TMessageRequestBody,
	sender: string,
	recipient: string,
	prevId: number
): TMessage => {
	return {
		status: 1,
		id: prevId + 1,
		...message,
		sender,
		recipient,
		type: 1,
		timestamp: Date.now(),
		meta: {
			tariffication: {
				paid: true,
				final: true,
			},
			auto: false,
		},
	};
};

export const sortParticipants = (
	bots: TParticipantResponseTransformed = {}
): TParticipantsResponse => {
	const promoIds: number[] = [];
	const activeIds: number[] = [];
	const disabledIds: number[] = [];
	const botsArr = Object.values(bots);

	for (const item of botsArr) {
		if (typeof item.promo?.priority === 'number') {
			promoIds.push(item.clientId);
		} else if (!item.preConditions) {
			activeIds.push(item.clientId);
		} else if (item.message === null && item.uid !== 'main') {
			disabledIds.push(item.clientId);
		} else {
			activeIds.push(item.clientId);
		}
	}
	promoIds.sort((aClientId, bClientId) => {
		const aPriority = bots[aClientId].promo?.priority;
		const bPriority = bots[bClientId].promo?.priority;
		return (bPriority || 0) - (aPriority || 0);
	});
	activeIds.sort((aClientId, bClientId) => {
		const aTimestamp = bots[aClientId].message?.timestamp;
		const BTimestamp = bots[bClientId].message?.timestamp;
		return (BTimestamp || 0) - (aTimestamp || 0);
	});
	disabledIds.sort((aClientId, bClientId) => {
		const aValue =
			bots[+aClientId].preConditions?.paymentOptions.find(
				(option) => option.type === 'level'
			)?.value || 0;
		const bValue =
			bots[bClientId].preConditions?.paymentOptions.find(
				(option) => option.type === 'level'
			)?.value || 0;
		return aValue - bValue;
	});
	return {
		promoIds,
		activeIds,
		disabledIds,
		bots,
	};
};

export const processLastMessageText = (text: string, meta: TMessageMeta) => {
	if (meta?.preview) {
		return `${String.fromCodePoint(127749)}  photo`;
	}
	if (meta?.hasAudio) {
		return `${String.fromCodePoint(127908)} audio message`;
	}

	return text;
};
export const transformChatsToDialogs = (
	data: TDialogResponse[]
): TDialogsState => {
	const ids: string[] = [];
	const items = data.reduce(
		(acc: TDialogStateItems, curr): TDialogStateItems => {
			const id = curr['user-id'];
			const senderId = curr.payload['sender-id'];
			const tariffication = curr.payload.meta?.tariffication;
			const timeStamp = DateTime.fromISO(
				curr.payload.timestamp as unknown as string
			);
			acc[id] = {
				total: curr.total,
				id: curr.payload.id,
				lastMessage: processLastMessageText(
					curr.payload.text,
					curr.payload.meta
				),
				encodedLastMessage: processLastMessageText(
					encodeSextingMessage(curr.payload.text),
					curr.payload.meta
				),
				tarifficationType: tariffication?.type,
				paid: tariffication?.paid ?? false,
				cost: tariffication?.cost ?? 0,
				senderId,
				unreadCount: 0,
				timestamp: timeStamp.toMillis(),
			};
			ids.push(id);
			return acc;
		},
		{}
	);
	return { ids, items };
};

export const addEncodedTextFieldToMessage = (message: TMessage): TMessage => {
	if (message.meta?.tariffication?.paid) {
		return message;
	}
	return {
		...message,
		timestamp: Date.now(),
		encodedText: encodeSextingMessage(message.text),
	};
};

export const adaptAudioMessage = (message: TMessage): TMessage => {
	const isAudio =
		(message.meta?.reference || '').includes('mp3') ||
		(message.meta?.reference || '').includes('audio');
	return {
		...message,
		meta: message.meta
			? {
					...message.meta,
					hasAudio: isAudio || message.meta.hasAudio,
			  }
			: null,
	};
};

export const addGifPath = (message: TMessage): TMessage => {
	return {
		...message,
		meta: message.meta
			? {
					...message.meta,
					giftPreview: message.meta?.gift ? message.meta?.reference : undefined,
					preview: message.meta?.reference,
			  }
			: null,
	};
};

function encodableSextingtransform(
	str: string,
	hideLatterCount: number
): string {
	const codeLetters = Array.from('╡╣║╜╒╞╟╬╫╨╪╥░▋▞▜');
	const characters = Array.from(str);
	const symbolsPositionSet = characters.map((char, index) => ({ char, index }));

	for (let i = 0; i < hideLatterCount && symbolsPositionSet.length > 0; i++) {
		const codeLettersIndex = Math.floor(Math.random() * codeLetters.length);
		const symbolSetIndex = Math.floor(
			Math.random() * symbolsPositionSet.length
		);

		const characterIndex = symbolsPositionSet[symbolSetIndex].index;
		characters[characterIndex] = codeLetters[codeLettersIndex];

		symbolsPositionSet.splice(symbolSetIndex, 1);
	}

	return characters.join('');
}

function rangesWords(str: string): RegExpMatchArray | null {
	const pattern = /(\p{L}+|\p{Emoji})/gu;
	return str.match(pattern);
}

export function encodeSextingMessage(str: string): string {
	let string = str;

	const matches = rangesWords(str);
	for (const match of matches || []) {
		const range =
			string.indexOf(match) !== -1
				? {
						start: string.indexOf(match),
						end: string.indexOf(match) + match.length,
				  }
				: undefined;
		if (!range) {
			continue;
		}

		const substring = string.slice(range.start, range.end);
		let hideLatterCount: number;
		switch (substring.length) {
			case 2:
				hideLatterCount = 1;
				break;
			case 3:
				hideLatterCount = 2;
				break;
			case 4:
			case 5:
				hideLatterCount = 3;
				break;
			default:
				hideLatterCount = 3;
				break;
		}

		const codedString = encodableSextingtransform(substring, hideLatterCount);

		string =
			string.substring(0, range.start) +
			codedString +
			string.substring(range.end);
	}

	return string;
}
