export const getHost = (): string => {
	return process.env.APP_HOST_URL ?? 'https://app.edenai.world';
};

export const replacePrefixInHost = (host: string, isLocal: boolean): string => {
	return isLocal ? host : host.replace('app', '').split('//')[1];
};

export const isHostLocal = (host: string): boolean => {
	return host.includes('localhost') || host.includes('192.168');
};
