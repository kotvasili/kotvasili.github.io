import { Client } from '@/contentful/utils';
import {NextRequest, NextResponse} from "next/server";
import {revalidatePath} from "next/cache";
import {IContentPageFields} from "@/contentful/generated/types";

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get('token')
    if (token !== process.env.REVALIDATE_SECRET_TOKEN) {
        return NextResponse.json({ revalidated: false, now: Date.now(), reason: 'token' })
    }

    try {
        const { items } = await Client.getEntries<IContentPageFields>({
            content_type: 'contentPage',
        });

        await Promise.all(
            items.map(async ({ fields }) =>
                revalidatePath('/'+fields.slug)
            ),
        );
        revalidatePath('/')
        return NextResponse.json({ revalidated: true, now: Date.now() })
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return NextResponse.json({ revalidated: false, now: Date.now(), reason: 'Error' })
    }

}
