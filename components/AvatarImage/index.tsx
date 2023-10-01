'use client'
import {FC, useState} from "react";
import { motion} from "framer-motion";
import Image from "next/image";
import {Asset} from "contentful";
import {contentfulLoader} from "@delicious-simplicity/next-image-contentful-loader";

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
export const AvatarImage = ({fields: {file, title}, className = '', delay, single = false}: Asset & {className?: string; delay: number; single?: boolean}) => {
    const [loaded, setLoaded] = useState(false)
    const vars = {
        ...variants,
        animate: {
            ...variants.animate,
            transition: {
                ...variants.animate.transition,
                delay: delay ? variants.animate.transition.delay + delay : variants.animate.transition.delay
            }
        }
    }
    return <motion.div
            key={+loaded}
            className={className}
            variants={vars}
            animate="animate"
            initial="initial"
        >
            <Image
                loader={(props) => contentfulLoader(props, { q: 100, fm: 'webp'})}
                alt={title}
                src={file.url ? `https:${file.url}` : ''}
                fill
                decoding='async'
                sizes={single ? "(max-width: 600px) 70vw, (max-width: 1000px) 50vw, 70vw" : "(max-width: 600px) 66vw, (max-width: 1000px) 33vw, 25vw"}
                onLoadingComplete={() => setLoaded(true)}
                quality={100}
                priority={single}
            />
        </motion.div>
}
