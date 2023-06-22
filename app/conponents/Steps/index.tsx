import styles from "./Steps.module.sass";
import typography from '../../styles/typography.module.sass'
import {IOurInfoFields} from "@/contentful/generated/types";
import {TextCard} from "@/app/conponents/TextCard";
import GhostBig from '../../../public/assets/GhostBig.svg'
import GhostSmall from '../../../public/assets/GhostSmall.svg'
import {Bubble} from "@/app/conponents/Bubble";
export const Steps = (props: IOurInfoFields) => {
    return <div className={styles.steps}>
        <GhostBig />
        <GhostSmall />
        <h2 className={`${typography.h2} ${styles.steps_title}`}><b>{props.title}</b><span>{props.title2}</span></h2>
        <div className={styles.steps_grid}>
            {props.ourInfoText.map(item => <TextCard text={item} key={item} className={styles.steps_grid_item}/>)}
        </div>
        <Bubble className='bubble-9 blur10 rot10 op06'/>
    </div>
}
