'use client'
import {IStoryCardFields} from "@/contentful/generated/types";
import styles from './StoryGridItem.module.sass'
import {CustomImage} from "@/app/conponents/CustomImage";
import {useInView} from 'react-intersection-observer'
import 'intersection-observer';

export const StoryGridItem = (fields: IStoryCardFields) => {
    // const ref = useRef(null)
    const {ref, inView} = useInView( {
        rootMargin: "0px 50px 0px",
        threshold: 0.9
    })
    return <div className={styles.grid_card}>
        <div className={`${styles.story} ${inView ? styles.story_active: ''}`} style={{maxWidth: fields.image.fields.file.details.image?.width}}>
            <span>story #{fields.number}</span>
            <div className={styles.story_back}  ref={ref}>
                <CustomImage {...fields.image}/>
            </div>
            <div className={styles.story_front}>
                <p>{fields.description}</p>
            </div>
        </div>
    </div>
}
