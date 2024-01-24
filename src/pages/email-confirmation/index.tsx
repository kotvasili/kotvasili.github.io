import Image from 'next/image';
import React, { memo } from 'react';

import { AuthContextProvider } from '~context/auth/provider';
import { useEmailConfirm } from '~hooks/emailConfirm/useEmailConfrim';
import ServerTokenHandler from '~services/ServerTokenHandler';

import { wrappedStore } from '../../store';
import { NextPageWithLayout } from '../_app';

const EmailConfirm: NextPageWithLayout = memo(() => {
	useEmailConfirm(NeuronIcon);

	return null;
});
EmailConfirm.displayName = 'EmailConfirm';
EmailConfirm.getLayout = (page) => (
	<AuthContextProvider>{page}</AuthContextProvider>
);

export default EmailConfirm;

const NeuronIcon = () => (
	<Image
		src="/img/neurons/gem-icon.png"
		alt="G"
		width={22}
		height={22}
		priority
	/>
);

export const getServerSideProps = wrappedStore.getServerSideProps(
	// eslint-disable-next-line @typescript-eslint/require-await
	(store) => async (ctx) => {
		const tokenHandler = new ServerTokenHandler(ctx, store);

		return tokenHandler.getRedirectResult();
	}
);
