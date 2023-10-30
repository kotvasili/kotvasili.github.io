import typography from '../../app/styles/typography.module.sass'
import styles from './BrandBookHero.module.sass'
import {AnimatedTitle} from "@/components/AnimatedTitle";
import {AvatarImage} from "@/components/AvatarImage";
import {HeroWrapper} from "@/components/HeroWrapper";
import {AnimContent} from "@/components/AnimContent";
import {Asset} from "contentful";
import {FC, PropsWithChildren, ReactNode} from "react";
import {BTN} from "@/components/BrandBookHero/BTN";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {Block, BLOCKS, Document, Inline, INLINES} from "@contentful/rich-text-types";
import Link from "next/link";
type TBrandbook = {
    title: string;
    text: string;
    fileUrl?: string;
    cta: string;
    bigTitle?: boolean;
    content?: Document;
    botImages: Asset[]
} & PropsWithChildren


const options = {
    renderNode: {
        // @ts-ignore
        [INLINES.HYPERLINK]: ({ data }, children) => (
            <Link
                href={data.uri}
            >{children}</Link>
        )
    },
};

export const BrandBookHero: FC<TBrandbook>  = ({title,text, botImages, fileUrl, cta, content, bigTitle = false }) => {
    return  <HeroWrapper className={`${styles.brandbook}`} >
        <div className={styles.brandbook_content} id='herocontent'>
            <AnimatedTitle className={`${typography.h1} ${bigTitle ? 'extended': ''}`} text={title} />
            <AnimContent delay={0.8}> {fileUrl ?<a href={'https:' + fileUrl}>
                <BTN>{cta}</BTN>
            </a> : content ? documentToReactComponents(content, options) : <BTN>{cta}</BTN> }</AnimContent>
        </div>
            <div className={styles.brandbook_image_wrapper}>
                <AvatarImage className={styles.brandbook_image} {...botImages[0]} delay={0.05} single/>
            </div>

    </HeroWrapper>
}
