import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    // Check for secret to confirm this is a valid request
    if (req.query.token !== process.env.REVALIDATE_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {

        await Promise.all(
            ['/', '/about', '/brandbook', '/terms', '/pp', '/support'].map(async item =>
                Promise.all([
                    res.revalidate(item),
                ])
            )
        );
        return res.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating');
    }
}
