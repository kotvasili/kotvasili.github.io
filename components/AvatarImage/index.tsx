'use client'
import Image from "next/image";
import {Asset} from "contentful";
import styles from './AvatarImage.module.sass'

export const AvatarImage = ({fields: {file, title}, className = '', delay, single = false, priority = false}: Asset & {className?: string; delay: number; single?: boolean; priority?: boolean}) => {
    return <div
            className={className}
        >
            <Image
                alt={title}
                src={file.url ? `https:${file.url}?fm=webp&q=100` : ''}
                fill
                style={{transitionDelay: delay ? `${0.5 + delay}s` : '0.5s', pointerEvents: 'none' }}
                decoding='async'
                className={styles.avaimg}
                sizes={single ? "(max-width: 600px) 70vw, (max-width: 1000px) 50vw, 70vw" : "(max-width: 600px) 66vw, (max-width: 1000px) 33vw, 25vw"}
                onLoadingComplete={img => img.classList.add(styles.avaimg_load)}
                quality={100}
                priority={priority}
            />
        </div>
}
