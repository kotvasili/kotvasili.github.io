import { createSelector, createSlice } from '@reduxjs/toolkit';

import { EmailConfirmBannerShowSecondTimeDelayMs } from '~constants/email-confirm';
import { loadFromStorage, saveToStorage } from '~utils/storage';

import { RootState } from '../index';

const BannerPostponedAtStorageKey = 'emailConfirm.bannerPostponedAt';
const ModalShownKey = 'emailConfirm.modalShown';
const LastSentStorageKey = 'emailConfirm.lastSent';

type EmailConfirmState = {
	bannerHide: boolean;
	// -1 - never postponed
	// 0 - postponed one time
	// unix time in ms - postponed at
	bannerPostponedAt: number;
	modalOpened: boolean;
	lastSent: number;
};

const initialState = (): EmailConfirmState => {
	const bannerPostponedAt = global.localStorage
		? loadFromStorage(BannerPostponedAtStorageKey, -1)
		: -1;
	const modalShown = global.localStorage
		? loadFromStorage(ModalShownKey, false)
		: false;
	const lastSent = global.localStorage
		? loadFromStorage(LastSentStorageKey, 0)
		: 0;

	return {
		bannerHide: false,
		bannerPostponedAt,
		// show only first time
		modalOpened: !modalShown,
		lastSent,
	};
};

const emailConfirmSlice = createSlice({
	name: 'emailConfirm',
	initialState,
	reducers: {
		emailConfirmRemind: (state) => {
			state.bannerHide = true;
			state.bannerPostponedAt = state.bannerPostponedAt < 0 ? 0 : Date.now();

			if (global.localStorage) {
				saveToStorage(BannerPostponedAtStorageKey, state.bannerPostponedAt);
			}
		},
		emailConfirmShowModal: (state) => {
			state.modalOpened = true;
		},
		emailConfirmHideModal: (state) => {
			state.modalOpened = false;
		},
		emailConfirmModalOpened: () => {
			if (global.localStorage) {
				saveToStorage(ModalShownKey, true);
			}
		},
		emailConfirmWasSend: (state) => {
			state.lastSent = Date.now();
		},
	},
});

const emailConfirm = (state: RootState) => state.emailConfirm;

export const emailConfirmCanShowBanner = createSelector(
	emailConfirm,
	(state) =>
		!state.bannerHide &&
		Date.now() >=
			state.bannerPostponedAt + EmailConfirmBannerShowSecondTimeDelayMs
);

export const emailConfirmIsModalOpened = createSelector(
	emailConfirm,
	(state) => state.modalOpened
);

export const getLastSent = createSelector(
	emailConfirm,
	(state) => state.lastSent
);

export const {
	emailConfirmRemind,
	emailConfirmShowModal,
	emailConfirmHideModal,
	emailConfirmModalOpened,
	emailConfirmWasSend,
} = emailConfirmSlice.actions;
export default emailConfirmSlice.reducer;
