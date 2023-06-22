import {Metadata} from "next";
import {Client} from "@/contentful/utils";
import {IContentPageFields} from "@/contentful/generated/types";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import { notFound } from 'next/navigation'
import buttonStyle from '../conponents/Button/Button.module.sass'
import styles from './Content.module.sass'
import Qrwhite from "@/public/assets/QRwhite.svg";
import Line from "@/public/assets/Line.svg";
const CONTENT_TYPE = 'contentPage';
import Link from "next/link";
export const revalidate = 43200000; //12 hrs


export default async function Terns({ params: {slug} }: { params: { slug: string } }) {
    const pageData = await getContent(slug);
    if(!pageData){
        notFound()
    }
    return (
        <>
            <main className={styles.content}>
                <h1>{pageData.title}</h1>
                <Link className={buttonStyle.button} href='/'>Back to main</Link>
                <Qrwhite />
                <div className={styles.content_main}>
                    {documentToReactComponents(pageData.content)}
                </div>
            </main>
            <Line />
        </>
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
