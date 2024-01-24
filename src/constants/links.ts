import { env } from 'next-runtime-env';

export const landingUrl = (env('NEXT_PUBLIC_APP_HOST_URL') ?? '').replace(
	'app.',
	''
);

export const TOCurl = landingUrl + '/terms';
export const PPurl = landingUrl + '/privacy';
export const SupportUrl = landingUrl + '/support';
export const RefundUrl = landingUrl + '/refund';
