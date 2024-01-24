import { FC, PropsWithChildren } from 'react';

import { IconButtonWrapper } from '~components/IconButton/IconButton.styles';
import { P } from '~components/Typography';

type IconButtonProps = PropsWithChildren & {
	onClick?: () => void;
	background?: boolean;
	iconSize?: number;
	clickableSize?: number;
	text?: string;
};
export const IconButton: FC<IconButtonProps> = ({
	children,
	background = false,
	iconSize = 24,
	clickableSize = 64,
	onClick,
	text,
}) => {
	return (
		<IconButtonWrapper
			background={background}
			iconSize={iconSize}
			clickableSize={clickableSize}
			onClick={onClick}
		>
			{children}
			{text && <P size="medium">{text}</P>}
		</IconButtonWrapper>
	);
};
