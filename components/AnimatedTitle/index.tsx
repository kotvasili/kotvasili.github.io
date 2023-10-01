'use client'
import {AnimatePresence, motion } from "framer-motion";
import {FC} from "react";
import styles from './AnimatedTitle.module.sass'
type TAnimTitle = {
    text: string,
    className?: string
}

const child = {
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
        },
    },
    hidden: {
        opacity: 0,
        y: 20,
        z: -10,
        transition: {
            ease :'easeIn'
        },
    },
};
export const AnimatedTitle:FC<TAnimTitle> = ({ text, className }) => {

    const letters = Array.from(text);
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
        }),
    };



    return (
        <AnimatePresence mode="wait">
        <motion.h1
            style={{ overflow: "hidden" }}
            variants={container}
            className={`${className} ${styles.title}`}
            initial="hidden"
            animate="visible"
            exit='hidden'
        >
            {letters.map((letter, index) => letter === '|' ? <br key={index}/> : (
                <motion.span variants={child} key={index+letter}>
                    {letter === " " ? "\u00A0" : letter }
                </motion.span>
            ))}
        </motion.h1>
        </AnimatePresence>
    );
};
