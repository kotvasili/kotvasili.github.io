import 'react-toastify/dist/ReactToastify.css';
import '~theme/global.css';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { env } from 'next-runtime-env';
import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { wrappedStore } from '../store';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};
const App = ({ Component, ...rest }: AppPropsWithLayout) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { store, props } = wrappedStore.useWrappedStore(rest);

	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<>
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicons/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicons/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicons/favicon-16x16.png"
				/>
				<link rel="manifest" href="/favicons/site.webmanifest" />
				<link
					rel="mask-icon"
					href="/favicons/safari-pinned-tab.svg"
					color="#333333"
				/>
				<link rel="shortcut icon" href="/favicons/favicon.ico" />
				<meta name="msapplication-TileColor" content="#333333" />
				<meta
					name="msapplication-config"
					content="/favicons/browserconfig.xml"
				/>
				<meta name="theme-color" content="#000" />
				<link rel="preconnect" href="https://www.googletagmanager.com" />
				<link rel="preconnect" href={env('NEXT_PUBLIC_PUBLIC_API')} />
				<title>EDEN AI by EVA AI</title>
				<meta name="robots" content="noindex" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, viewport-fit=cover, interactive-widget=resizes-content"
				/>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="dark-content"
				/>
				<meta name="color-scheme" content="dark" />
				<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
			</Head>
			<Script strategy="afterInteractive" id="google-analytics">
				{`
					(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
				})(window,document,'script','dataLayer','GTM-TJZLZM7');
				`}
			</Script>
			<ToastContainer
				hideProgressBar
				newestOnTop
				containerId="main"
				enableMultiContainer
			/>
			<Provider store={store}>
				{/* @ts-ignore */}
				{getLayout(<Component {...props.pageProps} />)} {/* eslint-disable-line */}
			</Provider>
		</>
	);
};

App.displayName = 'App';
export default App;
