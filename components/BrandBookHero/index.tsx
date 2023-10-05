import typography from '../../app/styles/typography.module.sass'
import styles from './BrandBookHero.module.sass'
import {Button} from "@/components/Button";
import Arrow from "@/public/assets/arrow.svg";
import {AnimatedTitle} from "@/components/AnimatedTitle";
import {AvatarImage} from "@/components/AvatarImage";
import {HeroWrapper} from "@/components/HeroWrapper";
import {AnimContent} from "@/components/AnimContent";
import {Asset} from "contentful";
import {FC, PropsWithChildren} from "react";
import {BTN} from "@/components/BrandBookHero/BTN";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {Document} from "@contentful/rich-text-types";

type TBrandbook = {
    title: string;
    text: string;
    fileUrl?: string;
    cta: string;
    hasImage?: boolean;
    content?: Document;
    botImages: Asset[]
} & PropsWithChildren

export const BrandBookHero: FC<TBrandbook>  = ({title,text, botImages, fileUrl, cta, content }) => {
    return  <HeroWrapper className={`${styles.brandbook}`} >
        <div className={styles.brandbook_content}>
            <AnimatedTitle className={typography.h1} text={title} />
            <AnimContent delay={0.8}> {fileUrl ?<a href={'https:' + fileUrl}>
                <BTN>{cta}</BTN>
            </a> : content ? documentToReactComponents(content) : <BTN>{cta}</BTN> }</AnimContent>
        </div>
            <div className={styles.brandbook_image_wrapper}>
                <AvatarImage className={styles.brandbook_image} {...botImages[0]} delay={0.05} single/>
            </div>

    </HeroWrapper>
}
