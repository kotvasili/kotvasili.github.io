import {IGetTheAppFields} from "@/contentful/generated/types";
import formStyles from "@/app/conponents/Form/Form.module.sass";
import Arrow3 from "@/public/assets/Arrow3.svg";
import GPlay from "@/public/assets/Gplay.svg";
import AppStore from "@/public/assets/AppStore.svg";
import styles from './GetApp.module.sass'
import {CustomImage} from "@/app/conponents/CustomImage";
import typography from '../../styles/typography.module.sass'
import {Bubble} from "@/app/conponents/Bubble";
export const GetApp = (props: IGetTheAppFields) => {
    return <div className={`${formStyles.form_wrapper} ${styles.getapp_outer}`}>
        <div className={formStyles.form_step_container}>
            <div className={formStyles.form_step_container_inner}>
                <p className={formStyles.form_step}>step 2</p>
                <Arrow3 />
            </div>
        </div>
        <div className={styles.getapp_wrapper}>
            <div className={styles.getapp_inner}>
                <div className={styles.getapp_inner_left}>
                    <CustomImage  {...props.qrCode}/>
                </div>
                <div className={styles.getapp_inner_text}>
                    <h3 className={typography.h3}>{props.title}<span>{props.title2}</span></h3>
                    <p>{props.text}</p>
                </div>
                <div className={styles.getapp_inner_links}>
                    <a href={props.androidLink} className={styles.getapp_inner_link}>
                        <GPlay />
                    </a>
                    <a href={props.iosLink} className={styles.getapp_inner_link}>
                        <AppStore />
                    </a>
                </div>
            </div>
        </div>
        <Bubble className='bubble-12 blur10 rot100' offset={15}/>
        <Bubble className='bubble-13 blur26 rot40' offset={60}/>
    </div>
}
