
import {Client} from "@/contentful/utils";
import { IEvaPageFields} from "@/contentful/generated/types";

import {Metadata} from "next";
import {HomeHero} from "@/components/HomeHero";
import {HeroLinks} from "@/components/HeroLinks";
export async function generateMetadata(): Promise<Metadata> {
  const result = await Client.getEntries<IEvaPageFields>({
    content_type: 'evaPage',
    locale: "en-US",
    include: 2,
    limit: 5
  });
  const fields = result.items.find(item => item.fields.title.toLowerCase().includes('home'))!.fields.seo?.fields;
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
export default async function  Home() {
  const pageData = await getLanding();
  return (
          <HomeHero
              title={pageData.heroContent.fields.title}
              text={pageData.heroContent.fields.description}
              botImages={pageData.heroContent.fields.botImages!}
          >
            <HeroLinks {...pageData.heroContent.fields.footer.fields}/>
          </HomeHero>

  )
}
async function getLanding() {
  const result = await Client.getEntries<IEvaPageFields>({
    content_type: 'evaPage',
    locale: "en-US",
    include: 2,
    limit: 5
  });
  return result.items.find(item => item.fields.title.toLowerCase().includes('home'))!.fields
}
