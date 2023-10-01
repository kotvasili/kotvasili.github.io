'use client'
import styles from './PageBg.module.sass'

import { motion} from 'framer-motion'
import {usePathname} from "next/navigation";
import {ArticlesRow} from "@/components/ArticlesRow";
import {Waves} from "@/components/Waves";
import {IArticle} from "@/contentful/generated/types";

const Pos: Record<string, any> = {
    '/': {
        left: '-10%',
        top: '20%',
    },
    '/about': {
        left: '-50%',
        top: '20%',
    },
    '/brandbook': {
        left: '60%',
        top: '-100%',
        scale: 2
    }
}

const WavePos: Record<string, any> = {
    '/': {
        x: '40%',
        opacity: 0.5,
        filter: 'blur(0px)'
    },
    '/about': {
        x: 0,
        opacity: 1,
        filter: 'blur(0px)'
    },
    '/brandbook': {
        opacity: 0,
        filter: 'blur(15px)'

    }
}
const variants = {
    initial: (pathname: string) => {
        return {
            ...Pos[pathname],
            scale: 0,
            opacity: 0,
        }
    },
    visible: (pathname: string) => {
        return {
            scale: 1,
            opacity: 1,
            ...Pos[pathname],
        }
    }
}
const waveVars = {
    initial: (pathname: string) => {
        return {
            left: '8%',
            top: '-15%',
            ...WavePos[pathname],
            opacity: 0,
            filter: 'blur(125px)'
        }
    },
    visible: (pathname: string) => {
        return {
            left: '8%',
            top: '-15%',
            ...WavePos[pathname],
            // transition: {
            //     // duration: 1.6
            // }
        }
    }
}
export const PageBG = ({articles }: {articles: IArticle[]}) => {
    const pathName = usePathname();
    return <>
        <div className={styles.bg}>
            <div className={styles.bg_inner}>
                <motion.div className={styles.bg_circle} custom={pathName} variants={variants} initial="initial" animate="visible"
                    transition={{
                        duration: 1,
                        ease: 'easeInOut',
                        type: "spring",
                        stiffness: 30,
                    }}
                />
                <motion.div
                    className={styles.bg_waves}
                    custom={pathName}
                    variants={waveVars}
                    initial="initial"
                    animate="visible"
                    transition={{
                                duration: 1,
                                ease: 'easeInOut',
                                type: "spring",
                                stiffness: 30,
                            }}>
                    <Waves />
                </motion.div>

            </div>
        </div>
        <div className={styles.bg_outer}>
            <ArticlesRow articles={articles} />
        </div>
    </>
}



