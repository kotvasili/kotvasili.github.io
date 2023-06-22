import './globals.css'
import localFont from 'next/font/local'
import {Footer} from "@/app/conponents/Footer";
import {Header} from "@/app/conponents/header";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={general.className}>
    <head>
        <link rel='icon' href='/favicon.ico'/>
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
    </head>
    <body>
    <Header />
    {children}
    <Footer />
    </body>
    </html>
  )
}
