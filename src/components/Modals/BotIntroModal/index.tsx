import Image from 'next/image';
import { FC, Fragment, useState } from 'react';

import { Button } from '~components/Button';
import { IconButton } from '~components/IconButton';
import { Modal } from '~components/Modals/Base';
import {
	BotInfoContent,
	BotIntroImage,
	BotIntroSliderContent,
} from '~components/Modals/BotIntroModal/BotIntroModal.styles';
import { ConfirmTextContent } from '~components/Modals/ConfirmModal';
import { ConfirmActions } from '~components/Modals/ConfirmModal/ConfirmModal.styles';
import { TModalProps } from '~components/Modals/types';
import { TBotIntroSlide } from '~services/api/user/types';
import { fadeIn } from '~theme/snippets';

import Close from '../../../../public/assets/icons/close.svg';

export const BotIntroModal: FC<
	TModalProps & { slides: TBotIntroSlide[]; imageUrl: string }
> = ({ open, locked, onClose, slides, imageUrl }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const handleNext = () => {
		if (currentSlide + 1 === slides.length) {
			return onClose();
		}
		setCurrentSlide((prevIndex) => prevIndex + 1);
	};
	return (
		<Modal open={open} locked={locked} onClose={onClose}>
			<BotInfoContent>
				<IconButton
					background
					iconSize={24}
					onClick={onClose}
					clickableSize={40}
				>
					<Close />
				</IconButton>
				<Image
					src={imageUrl}
					alt=""
					className={`${BotIntroImage} ${fadeIn}`}
					width={340}
					height={492}
				/>
				<BotIntroSliderContent>
					{slides.map(
						({ title, info, nextButton, showCancelButton, id }, index) => {
							return currentSlide === index ? (
								<Fragment key={index}>
									<ConfirmTextContent key={id} title={title} info={info} />
									<ConfirmActions>
										<Button grow={1} text={nextButton} onClick={handleNext} />
										{showCancelButton ? (
											<Button
												grow={1}
												type="secondary"
												text={'No, thanks'}
												onClick={onClose}
											/>
										) : null}
									</ConfirmActions>
								</Fragment>
							) : null;
						}
					)}
				</BotIntroSliderContent>
			</BotInfoContent>
		</Modal>
	);
};
