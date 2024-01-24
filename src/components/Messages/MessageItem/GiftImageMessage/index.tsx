import 'react-medium-image-zoom/dist/styles.css';

import Image from 'next/image';
import { FC } from 'react';

import { Loader } from '~components/Loader';
import { MSGIMGWrapper } from '~components/Messages/MessageItem/ImageMessage/ImageMessage.styles';
export const GiftMessage: FC<{ giftPreview: string }> = ({ giftPreview }) => {
	const content = () => {
		return (
			<MSGIMGWrapper>
				<Image
					src={giftPreview || ''}
					alt=""
					quality={100}
					width={450}
					height={450}
					className="Gift image is loading"
					onLoadingComplete={(img) => img.classList.remove('loading')}
				/>
				<Loader />
			</MSGIMGWrapper>
		);
	};

	return content();
};
