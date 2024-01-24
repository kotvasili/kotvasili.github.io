import { IconButton } from '~components/IconButton';

import Close from '../../../../../public/assets/icons/close.svg';

type TProps = {
	onClose?: () => void;
	type: 'mobile' | 'desktop';
};

export const CloseFeed = ({ onClose, type }: TProps) => {
	const isMobile = type === 'mobile';

	return (
		<IconButton
			onClick={onClose}
			background
			iconSize={isMobile ? 10 : 12}
			clickableSize={isMobile ? 24 : 28}
		>
			<Close />
		</IconButton>
	);
};
