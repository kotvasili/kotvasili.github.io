import { FC } from 'react';

import { DividerBlock } from '~components/Divider/Divider.styles';

type TDivider = {
	text: string;
	maxWidth?: number;
};
export const Divider: FC<TDivider> = ({ text, maxWidth }) => {
	return (
		<DividerBlock maxWidth={maxWidth}>
			<span>{text}</span>
		</DividerBlock>
	);
};
