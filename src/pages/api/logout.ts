import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';

import { AUTH_TOKEN_NAME, IS_AUTHORIZED_COOKIE_NAME } from '~constants/token';
import { getHost, isHostLocal, replacePrefixInHost } from '~utils/host';

type ResponseData = {
	message: string;
};
const handler = (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
	const cookies = new Cookies(req, res);
	const host = getHost();
	const isLocal = isHostLocal(host);
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	cookies.set(AUTH_TOKEN_NAME, null, {
		domain: replacePrefixInHost(host, isLocal),
		expires: yesterday,
	});
	cookies.set(IS_AUTHORIZED_COOKIE_NAME, null, {
		domain: replacePrefixInHost(host, isLocal),
		expires: yesterday,
	});
	res.status(200).json({ message: 'Token removed' });
};

export default handler;
