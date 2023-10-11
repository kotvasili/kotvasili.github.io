'use client'
import {FC, Fragment, MouseEvent, useCallback, useEffect, useState} from "react";
import {IBrandbookBlock} from "@/contentful/generated/types";
import styles from "@/components/BrandbookContent/BB.module.sass";
import {BBBlock} from "@/components/BrandbookContent/BBBlock";
import {Position} from "@/app/utils";

export const BrandbookContent: FC<{sections :IBrandbookBlock[]; fileUrl: string}> = ({sections, fileUrl}) => {
    const [active, setActive] = useState('')
    const links =  sections?.map(item => {
        return {
            hash: item.fields.hash,
            title: item.fields.linkText
        }
    })
    const handleClick = useCallback(( name: string) => (e: MouseEvent)  => {
        e.preventDefault()
        const el = document.getElementById(name)
        if (el && el.offsetTop) {
            // @ts-ignore
            window.scroll(0, Position(el, 70));
        }
    }, [])
    useEffect(() => {
        const el = document.getElementById(`${active}-link`);
        if(el){
            const elRight = el.offsetLeft + el.offsetWidth;
            const elLeft = el.offsetLeft;
            //@ts-ignore
            const elParentRight = el.parentNode!.offsetLeft + el.parentNode!.offsetWidth;
            //@ts-ignore
            const elParentLeft = el.parentNode!.offsetLeft;

            //@ts-ignore
            if (elRight > elParentRight + el.parentNode!.scrollLeft) {
                //@ts-ignore
                el.parentNode!.scrollLeft = elRight - elParentRight;
            }

            //@ts-ignore
            else if (elLeft < elParentLeft + el.parentNode!.scrollLeft) {
                //@ts-ignore
                el.parentNode!.scrollLeft = elLeft - elParentLeft;
            }
        }
    }, [active])

    return  <Fragment key='bb-content'><div className={styles.bb_wrapper} id='bb'>
        <div className={styles.bb_aside}>
            {links?.map(link => {
                return <a key={`#${link.hash}`} id={`${link.hash}-link`} href={`#${link.hash}`} className={active === link.hash ? 'active' : ''} onClick={handleClick(link.hash)}>{link.title}</a>
            })}
        </div>
        <div className={styles.bb_main}>
            {sections.map(({fields}) => <BBBlock {...fields} fileUrl={fileUrl} key={fields.hash} setVisibleSection={setActive}/>)}
        </div>
    </div>
        <div className={styles.bb_footer}>
            <div className={styles.bb_footer_inner}>
                <p>EVA AI</p>
                <p>All uses of the EVA AI materials are subject to the Terms and Conditions.</p>
            </div>
        </div>
    </Fragment>
}
