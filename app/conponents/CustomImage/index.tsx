import {Asset} from "contentful";
import Image from "next/image";
export const CustomImage = ({fields: {file, title}, className = ''}: Asset & {className?: string}) => {
    return <Image className={className} alt={title} width={file.details.image?.width} height={file.details.image?.height}
                  src={file.url ? `https:${file.url}` : ''} decoding='async'
    />
}
