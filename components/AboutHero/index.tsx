import {FC, PropsWithChildren} from "react";
import styles from './HeadContent.module.sass'
import {HeroWrapper} from "@/components/HeroWrapper";
import {AvatarImage} from "@/components/AvatarImage";
import {HeroCont} from "@/components/HeroCont";
import {Asset} from "contentful";

type THeadContent = {
    title: string;
    text: string;
    className?: string;
    botImages: Asset[]
} & PropsWithChildren

export const AboutHero: FC<THeadContent> = ({title, text, botImages, children}) => {
    return <HeroWrapper className={styles.head}>
        <HeroCont text={text} title={title}>{children}</HeroCont>
        <AvatarImage className={styles.head_image} {...botImages[0]} delay={0.05} single priority/>
    </HeroWrapper>
}
