import { FC } from 'react';

import { TagText } from '~components/Tag/Tag.styles';

export const Tag: FC<{ name: string }> = ({ name }) => {
	return <TagText size="xsmall">{name}</TagText>;
};
