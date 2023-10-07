import {Client} from "@/contentful/utils";
import {IEvaPageFields} from "@/contentful/generated/types";
import {Metadata, ResolvingMetadata} from "next";
import {BrandBookHero} from "@/components/BrandBookHero";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {BLOCKS, Inline, Block} from "@contentful/rich-text-types";
import {ReactNode} from "react";
const options = {
    renderNode: {
        [BLOCKS.TABLE]: (node: Block | Inline, children: ReactNode) => {
            return <div className='table'><table><tbody>{children}</tbody></table></div>;
        },
    },
};
export default async function PrivacyPage() {
    const pageData = await getPrivacy()
    return <><BrandBookHero
        title={pageData.heroContent.fields.title}
        text={pageData.heroContent.fields.description}
        hasImage={false}
        botImages={pageData.heroContent.fields.botImages!}
        fileUrl={pageData.brandbookMaterials?.fields.file.url!}
        cta={pageData.heroContent.fields.cta!}
    />
        <div className='content' id='bb'>
            {documentToReactComponents(pageData.richContent!, options)}
        </div>
    </>
}
async function getPrivacy() {
    const result = await Client.getEntries<IEvaPageFields>({
        content_type: 'evaPage',
        locale: "en-US",
        include: 2,
        limit: 10
    });
    return result.items.find(item => item.fields.title.toLowerCase().includes('privacy'))!.fields
}

export async function generateMetadata(_: any, parent: ResolvingMetadata): Promise<Metadata> {
    const result = await Client.getEntries<IEvaPageFields>({
        content_type: 'evaPage',
        locale: "en-US",
        include: 2,
        limit: 10
    });
    const fields = result.items.find(item => item.fields.title.toLowerCase().includes('privacy'))!.fields.seo?.fields;
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
