import 'react-medium-image-zoom/dist/styles.css';

import Image from 'next/image';
import { env } from 'next-runtime-env';
import { FC, useEffect, useRef } from 'react';
import Zoom from 'react-medium-image-zoom';

import { Loader } from '~components/Loader';
import { MSGIMGWrapper } from '~components/Messages/MessageItem/ImageMessage/ImageMessage.styles';
import { useGetImageSrcQuery } from '~services/api/dialogs';
import type { TMessage } from '~services/api/dialogs/types';

export const ImageMessage: FC<{
	message: TMessage & { userId: string; botId: string };
}> = (props) => {
	const hasPreview = props.message.meta?.preview;

	const imageRef = useRef<HTMLImageElement>(null);
	const reference = props.message.meta?.reference
		?.replace('{userId}', props.message.userId)
		?.replace('{botId}', props.message.botId)
		?.replace('{messageId}', props.message.id.toString());

	const url = `${env('NEXT_PUBLIC_PUBLIC_API') ?? ''}${
		reference?.replace('photo-ai:', '') as string
	}`;
	const { data, isSuccess } = useGetImageSrcQuery(
		{ url },
		{
			skip: !reference,
		}
	);

	useEffect(() => {
		if (isSuccess) {
			imageRef?.current?.classList.remove('loading');
		}
	}, [isSuccess]);

	const content = () => {
		return (
			<MSGIMGWrapper>
				<Image
					src={
						data
							? data
							: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
					}
					ref={imageRef}
					alt=""
					quality={100}
					width={450}
					height={450}
					className="botImage loading"
				/>
				<Loader />
			</MSGIMGWrapper>
		);
	};

	if (hasPreview) {
		return (
			<Zoom zoomMargin={globalThis.window?.innerWidth > 800 ? 100 : 0}>
				{content()}
			</Zoom>
		);
	}

	return <>{props.message.text}</>;
};
