import styles from "./HomeHero.module.sass";
import {AvatarImage} from "@/components/AvatarImage";
import {HeroWrapper} from "@/components/HeroWrapper";
import {HeroCont} from "@/components/HeroCont";
import {FC, PropsWithChildren} from "react";
import {Asset} from "contentful";

export const HomeHero: FC<PropsWithChildren & {title: string; text: string; botImages: Asset[]}> = ({botImages, text, title, children}) => {

    return   <HeroWrapper className={styles.home}>
        <div className={styles.home_images}>
            <AvatarImage className={styles.home_img} {...botImages[0]} delay={0.3}/>
            <AvatarImage className={styles.home_img} {...botImages[1]} delay={1} priority/>
            <AvatarImage className={styles.home_img} {...botImages[2]} delay={0.5}/>
            <AvatarImage className={styles.home_img} {...botImages[3]} delay={0.8}/>
        </div>
        <HeroCont title={title} text={text}>{children}</HeroCont>
    </HeroWrapper>
}
