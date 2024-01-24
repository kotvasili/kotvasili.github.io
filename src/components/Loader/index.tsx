import { FC } from 'react';

import { LoaderWrapper } from '~components/Loader/Loader.styles';

import LoaderSvg from '../../../public/assets/icons/loader.svg';
type TLoaderProps = {
	size?: number;
};
export const Loader: FC<TLoaderProps> = ({ size = 60 }) => {
	return (
		<LoaderWrapper size={size}>
			<LoaderSvg />
		</LoaderWrapper>
	);
};
