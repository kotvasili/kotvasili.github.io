import {Client} from "@/contentful/utils";
import { IPageLandingFields} from "@/contentful/generated/types";
import {Metadata} from "next";
import {Hero} from "@/app/conponents/Hero";
import {StoryGrid} from "@/app/conponents/StoryGrid";
import {Steps} from "@/app/conponents/Steps";
import {StoryForm} from "@/app/conponents/Form";
import {GetApp} from "@/app/conponents/GetApp";
import {HeroCards} from "@/app/conponents/HeroCards";

export const revalidate = 43200000; //12 hrs
export async function generateMetadata(): Promise<Metadata> {
  const result = await Client.getEntries<IPageLandingFields>({
    content_type: 'pageLanding',
    locale: "en-US",
    include: 1,
    limit: 1
  });
  const fields = result.items[0].fields.seoFields?.fields;
  return {...fields!,
      openGraph: {
          title: fields?.title!,
          description: fields?.description,
          url: 'https://stopghosting.me',
          siteName: 'Stop Ghosting me!',
          locale: 'en_US',
          type: 'website',
      },
  }
}
export default async function  Home() {
  const pageData = await getLanding();
  const images = pageData.stories!.slice(0, 9).map(story => story.fields.image!)
  return (<>
      <HeroCards images={images}/>
      <main>
          <Hero ctaText={pageData.heroCta}
                heroTitle={pageData.heroTitle!}
                heroTitle2={pageData.heroTitle2!}
                infoText={pageData.infoBlocks?.fields!}
                infoTitle={pageData.infoBlocksTitle}
                infoTitle2={pageData.infoBlocksTitle2}
          />
          <StoryGrid stories={pageData.stories!}/>
          <Steps {...pageData.ourInfoSteps?.fields!}/>
          <StoryForm {...pageData.form?.fields!}/>
          <GetApp {...pageData.getTheApp.fields} />
      </main>
  </>
  )
}
async function getLanding() {
  const result = await Client.getEntries<IPageLandingFields>({
    content_type: 'pageLanding',
    locale: "en-US",
    include: 1,
    limit: 1
  });
  return result.items[0].fields
}
