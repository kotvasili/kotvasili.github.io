import { debounce } from 'debounce';
import { useEffect, useRef } from 'react';
import { isIOS } from 'react-device-detect';

export const useIOSKeyboardLock = () => {
	const pageRef = useRef<HTMLDivElement>(null);
	const htmlRef = useRef<HTMLHtmlElement | null>(
		document?.querySelector(':root') ?? null
	);

	useEffect(() => {
		const html = htmlRef.current;
		if (!pageRef.current || !html) return;
		const handleScrollToTop = () => {
			setTimeout(() => {
				isIOS
					? window.scrollTo(0, 0)
					: pageRef?.current?.scrollIntoView({ block: 'end' });
			}, 10); //chrome ios hack
		};

		// Check for visual viewport to handle resizing
		const visualViewport = window.visualViewport;
		let offset = 0;

		if (visualViewport) {
			let viewportWidth = window.innerWidth;
			let viewportHeight = window.innerHeight;

			visualViewport.addEventListener(
				'resize',
				debounce((event) => {
					const $target = event.target as VisualViewport;
					const $page = pageRef.current as HTMLDivElement;
					if (pageRef.current === null) {
						return;
					}
					if (viewportWidth !== $target.width) {
						viewportWidth = window.innerWidth;
						viewportHeight = window.innerHeight;
					}

					if (viewportHeight - $target.height > 150) {
						handleScrollToTop();
						const adjustment = `${viewportHeight - $target.height - offset}px`;
						$page.style.bottom = adjustment;
						html.style?.setProperty('--keyboard-height', adjustment);
					} else if (
						viewportHeight === $target.height ||
						viewportHeight - $target.height <= 150
					) {
						offset = viewportHeight - $target.height;
						$page.style.bottom = '0px';
						html.style?.setProperty('--keyboard-height', '0px');
					}
				}, 300)
			);
		}

		document.addEventListener('touchend', handleScrollToTop);
		return () => {
			html.style?.setProperty('--keyboard-height', '0px');
			document.removeEventListener('touchend', handleScrollToTop);
		};
	}, []);

	return pageRef;
};
