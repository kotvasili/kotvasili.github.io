import { useCallback, useRef, useState } from 'react';

export type TModalOpenConfig = {
	title?: string;
	cb?: (success?: boolean) => void;
};

export const useModal = () => {
	const [isOpen, setOpen] = useState(false);
	const [title, setTitle] = useState<string | undefined>(undefined);
	const savedCallback = useRef<unknown>(undefined);
	const open = useCallback(
		({ title = '', cb }: TModalOpenConfig = {}) =>
			() => {
				setTitle(title || undefined);
				setOpen(true);
				if (typeof cb === 'function') {
					savedCallback.current = cb;
				}
			},
		[]
	);
	const close = useCallback((success?: boolean) => {
		setOpen(false);
		if (typeof savedCallback.current === 'function') {
			savedCallback.current(success);
			savedCallback.current = undefined;
		}
	}, []);

	return { isOpen, open, close, title };
};
