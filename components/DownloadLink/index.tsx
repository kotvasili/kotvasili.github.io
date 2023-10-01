'use client'
import {FC, PropsWithChildren} from "react";
import {motion} from "framer-motion";
import btnstyles from "@/components/Button/Button.module.sass";

export const DownloadLink:FC<PropsWithChildren & {href: string;}> = ({href, children}) => {
    return   <motion.a whileTap={{scale: 0.95}} href={href} className={`${btnstyles.button} medium primary`}>Download now</motion.a>
}
