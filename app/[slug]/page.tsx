import {Metadata} from "next";
import {Client} from "@/contentful/utils";
import {IContentPageFields} from "@/contentful/generated/types";
import { notFound } from 'next/navigation'
import styles from './Content.module.sass'
const CONTENT_TYPE = 'contentPage';


export default async function Terns({ params: {slug} }: { params: { slug: string } }) {
    const pageData = await getContent(slug);
    if(!pageData){
        notFound()
    }
    return (
            <main className={styles.content}>
            </main>
    )
}
export async function generateMetadata({ params: {slug} }: { params: { slug: string } }): Promise<Metadata> {
    const result = await Client.getEntries<IContentPageFields>({
        content_type: CONTENT_TYPE,
        'fields.slug': slug,
        locale: "en-US",
        include: 1,
        limit: 1
    });
    return result.items[0]?.fields?.seoFields?.fields!
}

async function getContent(slug: string) {
    const result = await Client.getEntries<IContentPageFields>({
        content_type: CONTENT_TYPE,
        'fields.slug': slug,
        locale: "en-US",
        include: 1,
        limit: 1
    });
    return result.items[0]?.fields
}

export async function generateStaticParams() {
    const result = await Client.getEntries<IContentPageFields>({
        content_type: CONTENT_TYPE,
        locale: "en-US",
        include: 10,
        limit: 10
    });

    return result.items.map((page) => ({
        slug: page.fields.slug,
    }))
}
