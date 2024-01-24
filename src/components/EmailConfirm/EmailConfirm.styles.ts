import { styled } from '@linaria/react';
import Image from 'next/image';

import { Button } from '~components/Button';

export const Container = styled.div`
	position: relative;
	min-width: 320px;
	max-width: 400px;
`;

export const Content = styled.div`
	margin: 20px 24px;
	display: flex;
	padding: 32px;
	flex-direction: column;
	align-items: flex-start;
	gap: 8px;
	border-radius: 12px;
	background: var(--color-black);

	box-shadow: 0 4px 80px 0 rgba(84, 83, 154, 0.5);
	backdrop-filter: blur(25px);
`;

export const VerifyButton = styled(Button)`
	margin-top: 20px;
`;

export const RemindButton = styled(Button)`
	margin-top: 8px;
`;

export const Gem = styled(Image)`
	position: absolute;
	right: 0;
	top: 0;
`;
