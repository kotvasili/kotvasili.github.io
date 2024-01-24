import { Head, Html, Main, NextScript } from 'next/document';
export default function Document() {
	return (
		<Html lang="en">
			<Head />
			{/* eslint-disable-next-line @next/next/no-sync-scripts */}
			<script src="/__ENV.js" />
			<body id="tonline-top">
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-TJZLZM7"
						height="0"
						width="0"
						style={{ display: 'none', visibility: 'hidden' }}
					></iframe>
				</noscript>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
