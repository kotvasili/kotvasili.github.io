import { FC, useCallback } from 'react';

import { Button } from '~components/Button';
import { IconButton } from '~components/IconButton';
import { Modal } from '~components/Modals/Base';
import {
	ConfirmActions,
	ConfirmContent,
	ConfirmContentMain,
} from '~components/Modals/ConfirmModal/ConfirmModal.styles';
import type { TModalProps } from '~components/Modals/types';
import { H1, P } from '~components/Typography';
import { fadeIn } from '~theme/snippets';

import Close from '../../../../public/assets/icons/close.svg';

type TConfirmText = {
	title: string;
	info?: string;
};
type TConfirmModalProps = TConfirmText & {
	invert?: boolean;
	confirmText: string;
	cancelText?: string;
	onConfirm: () => void;
};

export const ConfirmTextContent: FC<TConfirmText> = ({ title, info }) => {
	return (
		<ConfirmContentMain className={fadeIn}>
			<H1>{title}</H1>
			{info && <P transparent>{info}</P>}
		</ConfirmContentMain>
	);
};
export const ConfirmModal: FC<TModalProps & TConfirmModalProps> = ({
	open,
	locked,
	invert,
	onClose,
	title,
	info,
	onConfirm,
	cancelText = 'Cancel',
	confirmText,
}) => {
	const onSuccess = useCallback(() => {
		onConfirm();
		onClose();
	}, [onClose, onConfirm]);
	return (
		<Modal open={open} locked={locked} onClose={onClose}>
			<ConfirmContent>
				<IconButton
					background
					iconSize={24}
					onClick={onClose}
					clickableSize={40}
				>
					<Close />
				</IconButton>
				<ConfirmTextContent title={title} info={info} />
				<ConfirmActions>
					<Button
						grow={1}
						text={invert ? cancelText : confirmText}
						onClick={invert ? onClose : onSuccess}
					/>
					<Button
						grow={1}
						type="secondary"
						text={invert ? confirmText : cancelText}
						onClick={invert ? onSuccess : onClose}
					/>
				</ConfirmActions>
			</ConfirmContent>
		</Modal>
	);
};
