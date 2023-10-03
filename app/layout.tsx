import './vars.sass'
import './globals.sass'
import {Header} from '@/components/Header'
import localFont from 'next/font/local'
import {PageBG} from "@/components/PageBG";
import {Client} from "@/contentful/utils";
import {IArticleListFields, IEvaHeaderFields} from "@/contentful/generated/types";
const general = localFont(	{
    src: [
        {
            path: '../public/GeneralSans-Variable.woff2',
            weight: '200 700',
            style: 'normal',
        },
    ],
    fallback: ['arial', 'system-ui'],
    adjustFontFallback: 'Arial',
    preload: true,
    display:"swap",
})
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const {articles, header} = await getArticles()
  return (
    <html lang="en" className={general.className}>
        <head>
            <meta name="viewport-fit" content="cover" />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/favicons/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicons/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicons/favicon-16x16.png"
            />
            <link rel="manifest" href="/favicons/site.webmanifest" />
            <link
                rel="mask-icon"
                href="/favicons/safari-pinned-tab.svg"
                color="#333333"
            />
            <link rel="shortcut icon" href="/favicons/favicon.ico" />
            <meta name="msapplication-TileColor" content="#333333" />
            <meta
                name="msapplication-config"
                content="/favicons/browserconfig.xml"
            />
            <meta property="og:type" content="website"/>
            <meta property="og:site_name" content="EVA AI"/>
    </head>
      <body>
      <PageBG articles={articles.articles}/>
      <Header {...header} />
      <main>
          {children}
      </main>
      </body>
    </html>
  )
}
async function getArticles() {
    const result = await Client.getEntries<IArticleListFields>({
        content_type: 'articleList',
        locale: "en-US",
        include: 1,
        limit: 1
    });
    const header = await Client.getEntries<IEvaHeaderFields>({
        content_type: 'evaHeader',
        locale: "en-US",
        include: 1,
        limit: 1
    });
    // console.log(header)
    return {
        header: header.items[0].fields,
        articles: result.items[0].fields
    }
}
