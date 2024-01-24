import { memo } from 'react';

import { useHackRemoveQueryToken } from '~hooks/useHackRemoveQueryToken';
import { useRouteToLastBotId } from '~hooks/useLastBotId';
import Layout from '~layouts/chat';

import ServerTokenHandler from '../services/ServerTokenHandler';
import { wrappedStore } from '../store';
import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = memo(
	() => {
		const routeToLastBot = useRouteToLastBotId();
		useHackRemoveQueryToken(routeToLastBot);
		return <></>;
	},
	() => true
);

Home.displayName = 'Home';
Home.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export const getServerSideProps = wrappedStore.getServerSideProps(
	// eslint-disable-next-line @typescript-eslint/require-await
	(store) => async (ctx) => {
		const tokenHandler = new ServerTokenHandler(ctx, store);

		return tokenHandler.getRedirectResult();
	}
);

export default Home;
