import {FC, PropsWithChildren} from "react";
import styles from "./HeadCont.module.sass";
import {AnimatedTitle} from "@/components/AnimatedTitle";
import typography from "@/app/styles/typography.module.sass";
import {AnimContent} from "../AnimContent";
export const HeroCont: FC<PropsWithChildren & {text: string; title: string}> = ({text, title, children}) => {
    return  <div className={styles.headCont}>
        <AnimatedTitle text={title} className={typography.h2}/>
        <AnimContent delay={1.7}><p>{text}</p></AnimContent>
        {children}
    </div>
}
