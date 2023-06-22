import typography from '../../styles/typography.module.sass'
import styles from './Hero.module.sass'
import {Button} from "@/app/conponents/Button";
import Qrwhite from './../../../public/assets/QRwhite.svg'
import Arrow1 from './../../../public/assets/Arrow1.svg'
import Arrow2 from './../../../public/assets/Arrow2.svg'
import ArrowDown from './../../../public/assets/ArrowDown.svg'
import {FC, PropsWithChildren} from "react";
import {IInfoBlockFields} from "@/contentful/generated/types";
import {Bubble} from "@/app/conponents/Bubble";
import {ScrollButton} from "@/app/conponents/ScrollButton";

type THero = {
    ctaText: string;
    heroTitle: string;
    heroTitle2: string;
    infoTitle: string;
    infoTitle2: string;
    infoText: IInfoBlockFields
}
export const Hero: FC<PropsWithChildren & THero> = ({ctaText, heroTitle, heroTitle2, infoText, infoTitle, infoTitle2, children}) => {

 return <div className={styles.hero}>
     <h1 className={`${typography.h1} title`}><b>{heroTitle}</b><span>{heroTitle2}</span></h1>
     {children}
     <ScrollButton text={ctaText}/>
     <div className={styles.promo}>
         <p className={typography.h4}>{infoTitle2}</p>
         <Qrwhite />
     </div>
     <div className={`${styles.info} ${styles.info__one}`}>
         <p>{infoText.content[0]}</p>
         <Arrow1/>
     </div>
     <div className={`${styles.info} ${styles.info__two}`}>
         <p>{infoText.content[1]}</p>
         <Arrow2/>
     </div>
     <div className={`${styles.info} ${styles.info__three}`}>
         <p className={typography.h4}>{infoTitle}</p>
         <p>{infoText.content[2]}</p>
     </div>
     <ArrowDown/>
     <Bubble className='bubble-1'/>
     <Bubble className='bubble-2 op05 blur10' offset={15}/>
     <Bubble className='bubble-3 rot100'/>
 </div>
}
