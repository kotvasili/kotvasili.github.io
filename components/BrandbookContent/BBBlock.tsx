'use client'
import {FC} from "react";
import {IBrandbookBlockFields} from "@/contentful/generated/types";
import styles from "@/components/BrandbookContent/BB.module.sass";
import typography from "@/app/styles/typography.module.sass";
import {Button} from "@/components/Button";
import {CustomImage} from "@/components/CustomImage";
import {useInView} from "react-intersection-observer";

export const BBBlock:FC<IBrandbookBlockFields & {fileUrl: string; setVisibleSection: (id: string) => void}> = ({hash, text, linkText, title, images, fileUrl, setVisibleSection}) => {
    const { ref } = useInView({
        threshold: 0.1,
        rootMargin: `-15% 0px -45% 0px`,
        onChange: (inView) => {
            if (inView && hash) {
                setVisibleSection(hash);
            }
        },
    });
    if(hash === 'signs'){
        return <div className={styles.bb_block} id={hash} ref={ref}>
            <section className={styles.bb_col}>
                <h2 className={typography.h1}>{title}</h2>
                <p>
                    {text}
                </p>
                <a href={fileUrl}>
                    <Button buttonType={'large'}>Download<span>.zip</span></Button>
                </a>
            </section>
            <div className={`${styles.bb_col} ${styles.bb_sign} `}>
                <CustomImage {...images[0]}/>
                <CustomImage {...images[1]}/>
                <CustomImage {...images[2]}/>
            </div>
        </div>
    }
    if(hash === 'incontext'){
        return <section className={styles.bb_block} id={hash}  ref={ref}>
            <h2 className={typography.h1}>{title}</h2>
            <div className={styles.bb_col}>
                <p>
                    {text}
                </p>
                <a href={fileUrl}>
                    <Button buttonType={'large'}>Download<span>.zip</span></Button>
                </a>
            </div>
            <div className={`${styles.bb_col} `}>
                <CustomImage {...images[0]}/>
            </div>
        </section>
    }
    if(hash === 'co-brand'){
        return <div className={styles.bb_block} id={hash} ref={ref}>
            <section className={styles.bb_col}>
                <h2 className={typography.h1}>{title}</h2>
            </section>
            <div></div>
            <div className={styles.bb_col}>
                <p>
                    {text}
                </p>
            </div>
            <div className={styles.bb_col}>
                <a href={fileUrl}>
                    <Button buttonType={'large'}>Download<span>.zip</span></Button>
                </a>
            </div>
            {images.map(img =>    <CustomImage {...img} key={img.sys.id}/>)}
        </div>
    }
    if(hash === 'avoid'){
        return <div className={styles.bb_block} id={hash} ref={ref}>
            <section className={`${styles.bb_col} ${styles.bb_avoid}`}>
                <h2 className={typography.h1}>{title}</h2>
            </section>
            <div></div>
            <div className={styles.bb_col}>
                <p>
                    {text}
                </p>
            </div>
            <div className={styles.bb_col}>
                <a href={fileUrl}>
                    <Button buttonType={'large'}>Download<span>.zip</span></Button>
                </a>
            </div>
            <div className={styles.bb_imggrid}>
                <div className={styles.bb_imggrid_item}>
                    {images.map((img, i) => i <= 5 ?<CustomImage {...img} key={img.sys.id}/> : null)}
                </div>
                <div className={styles.bb_imggrid_item}>
                    {images.map((img, i) => i > 5 ?<CustomImage {...img} key={img.sys.id}/> : null)}
                </div>
            </div>
        </div>
    }
    if(hash === 'examples'){
        return <div className={styles.bb_block} id={hash} ref={ref}>
            <section className={`${styles.bb_col} ${styles.bb_avoid}`}>
                <h2 className={typography.h1}>{title}</h2>
            </section>
            <div></div>
            <div className={styles.bb_col}>
                <a href={fileUrl}>
                    <Button buttonType={'large'}>Download<span>.zip</span></Button>
                </a>
            </div>
            <div className={`${styles.bb_sign} `}>
                <CustomImage {...images[0]}/>
                <CustomImage {...images[1]}/>
                <CustomImage {...images[2]}/>
            </div>
        </div>
    }
    return null
}
