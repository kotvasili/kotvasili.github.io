import {BrandBookHero} from "@/components/BrandBookHero";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {Client} from "@/contentful/utils";
import {IEvaPageFields} from "@/contentful/generated/types";
import {Metadata, ResolvingMetadata} from "next";

export default async function TermsPageAndroid() {
    const pageData = await getTerms()
    return <><BrandBookHero
        title={pageData.heroContent.fields.title}
        text={pageData.heroContent.fields.description}
        botImages={pageData.heroContent.fields.botImages!}
        fileUrl={pageData.brandbookMaterials?.fields.file.url!}
        cta={pageData.heroContent.fields.cta!}
    />
        <div className='content' id='bb'>
            {documentToReactComponents(pageData.richContent!)}
        </div>
    </>
}
async function getTerms() {
    const result = await Client.getEntries<IEvaPageFields>({
        content_type: 'evaPage',
        locale: "en-US",
        include: 2,
        limit: 15
    });
    return result.items.find(item => item.fields.title.toLowerCase().includes('terms/android'))!.fields
}

export async function generateMetadata(_: any, parent: ResolvingMetadata): Promise<Metadata> {
    const result = await Client.getEntries<IEvaPageFields>({
        content_type: 'evaPage',
        locale: "en-US",
        include: 2,
        limit: 15
    });
    const fields = result.items.find(item => item.fields.title.toLowerCase().includes('terms/android'))!.fields.seo?.fields;
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
        }
    }
}
