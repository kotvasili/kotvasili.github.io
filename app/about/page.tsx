import {AboutHero} from "@/components/AboutHero";
import {Client} from "@/contentful/utils";
import {IEvaPageFields} from "@/contentful/generated/types";
import {FooterLinks} from "@/components/FooterLinks";
import {Metadata, ResolvingMetadata} from "next";

export default async function AboutPage(){
    const {heroContent} = await getAbout();
    return  <AboutHero
            title={heroContent.fields.title}
            text={heroContent.fields.description}
            botImages={heroContent.fields.botImages!}
    >
        <FooterLinks
            copyright={heroContent.fields.copyright!}
            terms={heroContent.fields.terms!}
            privecypolicy={heroContent.fields.privacypolicy!}
            customerSupport={heroContent.fields.customerSupport!}
        />
        </AboutHero>
}
async function getAbout() {
    const result = await Client.getEntries<IEvaPageFields>({
        content_type: 'evaPage',
        locale: "en-US",
        include: 2,
        limit: 10
    });
    return result.items.find(item => item.fields.title.toLowerCase().includes('about'))!.fields
}

export async function generateMetadata(_: any, parent: ResolvingMetadata): Promise<Metadata> {
    const result = await Client.getEntries<IEvaPageFields>({
        content_type: 'evaPage',
        locale: "en-US",
        include: 2,
        limit: 10
    });
    const fields = result.items.find(item => item.fields.title.toLowerCase().includes('about'))!.fields.seo?.fields;
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
            canonical: `/about`
        }
    }
}
