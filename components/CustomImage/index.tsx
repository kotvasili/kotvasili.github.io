'use client'
import {Asset} from "contentful";
import Image from "next/image";
import {contentfulLoader} from "@delicious-simplicity/next-image-contentful-loader";
export const CustomImage = ({fields: {file, title}, className = ''}: Asset & {className?: string}) => {
    return <Image
        loader={(props) => contentfulLoader(props, { q: 100, fm: 'webp'})}
        alt={title}
        width={file.details.image?.width! / 2}
        height={file.details.image?.height! / 2}
        src={file.url ? `https:${file.url}` : ''}
        decoding='async'
        className={`image h ${className ?? ''}`}
        onLoadingComplete={(image) => image.classList.remove('h')}
    />
}
