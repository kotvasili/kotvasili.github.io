'use client'
import {Asset} from "contentful";
import Image from "next/image";
import {useCallback, useState} from "react";
import styles from './CustomImage.module.sass'
export const CustomImage = ({fields: {file, title}, className = ''}: Asset & {className?: string, src?: string, width?: number, height?: number}) => {
    const [loaded, setLoaded] = useState('')
    const setLoadedClass = useCallback(() => {
        setLoaded('image_loaded')
    }, [])
    return <Image className={`${styles.image} ${className} ${loaded}`}
                  alt={title}
                  width={file.details.image?.width}
                  height={file.details.image?.height}
                  src={file.url ? `https:${file.url}` : ''}
                  decoding='async'
                  onLoadingComplete={setLoadedClass}
    />
}
export const LocalImage = ({ className = '', src, width, height, alt}: {className?: string, src: string, width: number, height: number, alt: string}) => {
    const [loaded, setLoaded] = useState('')
    const setLoadedClass = useCallback(() => {
        setLoaded('image_loaded')
    }, [])
    return <Image className={`${styles.image} ${className} ${loaded}`}
                  alt={alt}
                  width={width}
                  height={height}
                  src={src}
                  decoding='async'
                  onLoadingComplete={setLoadedClass}
    />
}
