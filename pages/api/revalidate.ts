import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@/contentful/utils';
import {IContentPageFields} from "@/contentful/generated/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    // Check for secret to confirm this is a valid request
    if (req.query.token !== process.env.REVALIDATE_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        const { items } = await Client.getEntries<IContentPageFields>({
            content_type: 'contentPage',
        });

        await Promise.all(
            items.map(async ({ fields }) =>
                Promise.all([
                    res.revalidate('/' + fields.slug),
                ])
            )
        );
        await  res.revalidate('/');
        return res.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating');
    }
}
