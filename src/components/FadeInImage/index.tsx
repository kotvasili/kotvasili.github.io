import Image, { ImageProps } from 'next/image';
import { FC } from 'react';

export const FadeInImage: FC<ImageProps> = (props) => {
	return (
		<Image
			{...props}
			alt={props.alt}
			className={`image h ${props.className ?? ''}`}
			onLoadingComplete={(image) => image.classList.remove('h')}
		/>
	);
};
