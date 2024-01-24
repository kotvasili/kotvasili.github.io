import { browserName, osName, osVersion } from 'react-device-detect';

import { LoggerMessages, LoggerServices } from '~services/logger/constants';
import { Datadog } from '~services/logger/datadog';
import { Level, Log } from '~services/logger/types';

const productName = 'EDEN';

export class Logger {
	static shared = new Logger();

	private userId: string | undefined;

	updateUserId = (userId: string | undefined) => {
		this.userId = userId;
	};

	log = (
		level: Level,
		service: LoggerServices,
		message: LoggerMessages,
		payload: Record<string, unknown>
	) => {
		const navInfo = navigator as NavigatorNetworkInformation;
		const connection: { effectiveType?: string } | undefined =
			navInfo.connection || navInfo.mozConnection || navInfo.webkitConnection;

		const log = {
			service,
			message,
			payload,
			product: productName,
			userId: this.userId,
			connectionEffectiveType: connection?.effectiveType,
			browser: browserName,
			os: osName,
			osVersion,
		} as Log;

		Datadog.log(level, log);
	};
}

export * from './constants';
export * from './types';
