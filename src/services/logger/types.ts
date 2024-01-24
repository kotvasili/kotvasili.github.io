import { LoggerMessages, LoggerServices } from '~services/logger/constants';

export enum Level {
	debug = 'debug',
	info = 'info',
	warn = 'warn',
	error = 'error',
}

export type Log = {
	service: LoggerServices;
	message: LoggerMessages;
	payload?: Record<string, unknown>;
	product?: string;
	userId?: string | null;
	fingerprint?: string;
	browser?: string;
	os?: string;
	osVersion?: string;
	connectionEffectiveType?: string;
};
