declare module '@motopays/pay-form';
declare module '*.svg' {
	import * as React from 'react';

	export const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & { title?: string }
	>;

	const src: string;
	export default src;
}

declare module 'next/config' {
	type ConfigTypes = () => {
		publicRuntimeConfig: {
			MOTO_ENV: string;
			MOTO_MERCHANT_ID: string;
			MOTO_URL: string;
			PUBLIC_API: string;
			APP_HOST_URL: string;
		};
	};

	declare const getConfig: ConfigTypes;

	export default getConfig;
}

declare global {
	interface Window {
		dataLayer: any[];
	}
}
export {};
