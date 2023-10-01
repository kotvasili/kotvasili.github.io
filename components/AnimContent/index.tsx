'use client'
import {FC, PropsWithChildren} from "react";
import {motion} from "framer-motion";

const variants = {
    initial: {
        opacity: 0,
        filter: "blur(15px)",
    },
    animate: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { type: "spring", duration: 1, delay: 0.5 }
    }
}
export const AnimContent: FC<PropsWithChildren & {delay: number; className?: string}> = ({children, delay, className}) => {
    const vars = {
        ...variants,
        animate: {
            ...variants.animate,
            transition: {
                ...variants.animate.transition,
                delay
            }
        }
    }
    return <motion.div
        variants={vars}
        style={{ transform: 'translateZ(0)'}}
        animate='animate'
        initial='initial'
        className={className}
    >{children}
    </motion.div>
}
