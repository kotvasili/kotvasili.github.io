import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	res.status(200).json({
		HOST: req.headers.host,
		MOTO_ENV: process.env.MOTO_ENV,
		MOTO_MERCHANT_ID: process.env.MOTO_MERCHANT_ID,
		MOTO_URL: process.env.MOTO_URL,
		PUBLIC_API: process.env.PUBLIC_API,
	});
};
export default handler;
