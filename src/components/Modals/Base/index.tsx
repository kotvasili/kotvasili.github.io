import { AnimatePresence } from 'framer-motion';
import type {
	CSSProperties,
	FC,
	MouseEventHandler,
	PropsWithChildren,
	ReactElement,
} from 'react';
import { Children, cloneElement, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import {
	BaseVisibilityWrapper,
	overlayStyle,
} from '~components/Modals/Base/Base.styles';
import type { TModalProps } from '~components/Modals/types';

type TProps = PropsWithChildren &
	TModalProps & { className?: string; style?: CSSProperties };

const Base: FC<TProps> = ({ locked, onClose, className, style, children }) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		modalRef.current?.focus();
	}, []);
	const handleInsideClick: MouseEventHandler<HTMLDivElement> = (event) => {
		event.stopPropagation();
	};

	const handleOutsideClick: MouseEventHandler<HTMLDivElement> = () => {
		if (onClose && !locked) {
			onClose();
		}
	};

	const modifiedChildren = Children.map(children, (child, index) => {
		if (index === 0) {
			// Add your specific prop to the first child here
			return cloneElement(child as ReactElement, {
				onClick: handleInsideClick,
				role: 'dialog',
				'aria-modal': true,
			});
		}
		return child;
	});

	return createPortal(
		<BaseVisibilityWrapper
			tabIndex={-1}
			ref={modalRef}
			className={`${overlayStyle} ${className ? className : ''}`}
			onClick={handleOutsideClick}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			style={style}
			autoFocus
		>
			{modifiedChildren}
		</BaseVisibilityWrapper>,
		document.body
	);
};

export const Modal: FC<TProps> = ({ open, className, style, ...rest }) => {
	return (
		<AnimatePresence mode="wait" initial={false}>
			{open && (
				<Base {...rest} open={open} className={className} style={style} />
			)}
		</AnimatePresence>
	);
};
