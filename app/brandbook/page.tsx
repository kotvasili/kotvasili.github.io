
import {BrandBookHero} from "@/components/BrandBookHero";
import {Client} from "@/contentful/utils";
import {IEvaPageFields} from "@/contentful/generated/types";
import {Metadata, ResolvingMetadata} from "next";
import {BrandbookContent} from "@/components/BrandbookContent";
import {Fragment} from "react";

export default async function BrandBookPage() {
    const pageData = await getBrandBook()

    return  <Fragment key='brand'><BrandBookHero
        title={pageData.heroContent.fields.title}
        text={pageData.heroContent.fields.description}
        botImages={pageData.heroContent.fields.botImages!}
        cta={pageData.heroContent.fields.cta!}
    />
    <BrandbookContent
        sections={...pageData.brandbookSections!}
        fileUrl={pageData.brandbookMaterials?.fields.file.url!}
    />
    </Fragment>
}
async function getBrandBook() {
    const result = await Client.getEntries<IEvaPageFields>({
        content_type: 'evaPage',
        locale: "en-US",
        include: 2,
        limit: 10
    });
    return result.items.find(item => item.fields.title.toLowerCase().includes('brandbook'))!.fields
}

export async function generateMetadata(_: any, parent: ResolvingMetadata): Promise<Metadata> {
    const result = await Client.getEntries<IEvaPageFields>({
        content_type: 'evaPage',
        locale: "en-US",
        include: 2,
        limit: 10
    });
    const fields = result.items.find(item => item.fields.title.toLowerCase().includes('brandbook'))!.fields.seo?.fields;
    const previousImages = (await parent).openGraph?.images || []
    return {
        title: fields?.title,
        description: fields?.description,
        openGraph: {
            title: fields?.title,
            description: fields?.description,
            locale: 'en_US',
            images: [...previousImages]
        },
        twitter: {
            title: fields?.title,
            description: fields?.description,
            images: [...previousImages]
        },
        alternates: {
            canonical: `/brandbook`,
        }
    }
}
