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

type TBrandbook = {
    title: string;
    text: string;
    botImages: Asset[]
} & PropsWithChildren

export const BrandBookHero: FC<TBrandbook>  = ({title,text, botImages}) => {
    return  <HeroWrapper className={`${styles.brandbook}`} >
        <div className={styles.brandbook_content}>
            <AnimatedTitle className={typography.h1} text={title} />
            <AnimContent delay={0.8}>  <Button buttonType="large"><Arrow/>Brandbook</Button></AnimContent>
        </div>
        <div className={styles.brandbook_image_wrapper}>
            <AvatarImage className={styles.brandbook_image} {...botImages[0]} delay={0.05} single/>
        </div>
    </HeroWrapper>
}
