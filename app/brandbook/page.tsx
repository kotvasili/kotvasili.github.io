import {BrandBookHero} from "@/components/BrandBookHero";
import {HeroWrapper} from "@/components/HeroWrapper";
import {Client} from "@/contentful/utils";
import {IEvaPageFields} from "@/contentful/generated/types";
import {Asset} from "contentful";
import {PropsWithChildren} from "react";
import {Metadata} from "next";

export default async function BrandBookPage() {
    const pageData = await getBrandBook()
    return  <BrandBookHero
        title={pageData.heroContent.fields.title}
        text={pageData.heroContent.fields.description}
        botImages={pageData.heroContent.fields.botImages!}
    />
}
async function getBrandBook() {
    const result = await Client.getEntries<IEvaPageFields>({
        content_type: 'evaPage',
        locale: "en-US",
        include: 2,
        limit: 5
    });
    return result.items.find(item => item.fields.title.toLowerCase().includes('brandbook'))!.fields
}

export async function generateMetadata(): Promise<Metadata> {
    const result = await Client.getEntries<IEvaPageFields>({
        content_type: 'evaPage',
        locale: "en-US",
        include: 2,
        limit: 5
    });
    const fields = result.items.find(item => item.fields.title.toLowerCase().includes('brandbook'))!.fields.seo?.fields;
    return {
        title: fields?.title,
        description: fields?.description,
        metadataBase: new URL('https://www.evaapp.ai'),
        openGraph: {
            title: fields?.title,
            description: fields?.description,
            locale: 'en_US',
        },
        twitter: {
            title: fields?.title,
            description: fields?.description,
        }
    }
}
