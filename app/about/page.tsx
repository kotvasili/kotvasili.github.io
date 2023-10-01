import {AboutHero} from "@/components/AboutHero";
import {Client} from "@/contentful/utils";
import {IEvaPageFields} from "@/contentful/generated/types";
import {FooterLinks} from "@/components/FooterLinks";
import {Metadata} from "next";

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
        />
        </AboutHero>
}
async function getAbout() {
    const result = await Client.getEntries<IEvaPageFields>({
        content_type: 'evaPage',
        locale: "en-US",
        include: 2,
        limit: 5
    });
    return result.items.find(item => item.fields.title.toLowerCase().includes('about'))!.fields
}

export async function generateMetadata(): Promise<Metadata> {
    const result = await Client.getEntries<IEvaPageFields>({
        content_type: 'evaPage',
        locale: "en-US",
        include: 2,
        limit: 5
    });
    const fields = result.items.find(item => item.fields.title.toLowerCase().includes('about'))!.fields.seo?.fields;
    return {
        title: fields?.title,
        description: fields?.description,
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
