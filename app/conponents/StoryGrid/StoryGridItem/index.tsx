'use client'
import {IStoryCardFields} from "@/contentful/generated/types";
import styles from './StoryGridItem.module.sass'
import {CustomImage} from "@/app/conponents/CustomImage";
import {useInView} from "framer-motion";
import {useRef} from "react";
export const StoryGridItem = (fields: IStoryCardFields) => {
    const ref = useRef(null)
    const isInView = useInView(ref, {
        margin: "0px 50px 0px",
        amount: 1
    })
    return <div className={styles.grid_card}>
        <div className={`${styles.story} ${isInView ? styles.story_active: ''}`} style={{maxWidth: fields.image.fields.file.details.image?.width}}>
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
