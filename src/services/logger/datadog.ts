import { datadogLogs } from '@datadog/browser-logs';

import { Level, Log } from './types';

const clientToken = 'pub357e76fcd649e2725c1fe05a33c81be9';

let initialized = false;

function init() {
	initialized = true;

	datadogLogs.init({
		clientToken,
		forwardErrorsToLogs: true,
		sessionSampleRate: 100,
	});
}

export class Datadog {
	static log = (logLevel: Level, data: Log) => {
		if (!initialized) {
			init();
		}

		const payload = {
			service: data.service,
			hostname: data.product,
			status: logLevel,
			connectionEffectiveType: data.connectionEffectiveType,
			browser: data.browser,
			os: data.os,
			osVersion: data.osVersion,
			user: data.userId,
			...(data.fingerprint && { fingerprint: data.fingerprint }),
			...(data.payload && { payload: data.payload }),
		};

		datadogLogs.logger.log(data.message, payload, logLevel);
	};
}
