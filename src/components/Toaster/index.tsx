import 'react-toastify/dist/ReactToastify.min.css';

import Image from 'next/image';
import React, { FC } from 'react';
import { Flip, toast } from 'react-toastify';

import { P } from '~components/Typography';

import { Wrapper } from './Toaster.styles';
type TToast = {
	title: string;
	text: string;
};
const Toast: FC<TToast> = ({ title, text, ...rest }) => (
	<Wrapper {...rest}>
		{title && (
			<P size="medium" align="left">
				{title}
			</P>
		)}
		{text && (
			<P transparent size="medium" align="left">
				{text}
			</P>
		)}
	</Wrapper>
);
const ToastInner: FC<Omit<TToast, 'title'>> = ({ text, ...rest }) => (
	<Wrapper {...rest}>{text && <P size="medium">{text}</P>}</Wrapper>
);
const baseConfig = {
	containerId: 'main',
};
export const Toaster = {
	show: ({ title = '', text = '', ...cfg }) =>
		toast.success(<Toast {...{ title, text }} />, { ...baseConfig, ...cfg }),
	showSuccess: ({ title = '', text = '' }) =>
		toast.success(<Toast {...{ title, text }} />, {
			icon: () => (
				<Image src="/assets/icons/tick.svg" alt="tick" width={24} height={24} />
			),
			...baseConfig,
		}),
	showInfo: ({ title = '', text = '' }) =>
		toast.info(<Toast {...{ title, text }} />, baseConfig),
	showWarn: ({ title = '', text = '' }) =>
		toast.warn(<Toast {...{ title, text }} />, baseConfig),
	showError: ({ title = '', text = '' }) =>
		toast.error(<Toast {...{ title, text }} />, baseConfig),
	showLevelMessage: ({ text = '' }) =>
		toast.info(<ToastInner {...{ text }} />, {
			containerId: 'messages-toast',
			transition: Flip,
			className: 'round',
			closeButton: false,
			position: 'top-center',
			icon: false,
			draggable: false,
			delay: 2000,
		}),
};
