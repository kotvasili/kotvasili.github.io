import { styled } from '@linaria/react';
import { CSSProperties } from 'react';

type TAlign = 'left' | 'center' | 'right';
export const H1 = styled.h1<{
	align?: TAlign;
	transform?: CSSProperties['textTransform'];
	weight?: CSSProperties['fontWeight'];
	multiline?: boolean;
}>`
	font-size: 32px;
	line-height: 44px;
	font-weight: ${({ weight }) => weight ?? 400};
	text-align: ${({ align }) => align ?? 'center'};
	text-wrap: balance;
	text-transform: ${({ transform }) => transform ?? 'inherit'};
	white-space: ${({ multiline }) => (multiline ? 'pre-wrap' : 'inherit')};
	max-width: 400px;
`;

export const H2 = styled.h2<{
	align?: TAlign;
	transform?: CSSProperties['textTransform'];
}>`
	font-size: 24px;
	line-height: 32px;
	font-weight: 500;
	text-align: ${({ align }) => align ?? 'center'};
	text-wrap: balance;
	text-transform: ${({ transform }) => transform ?? 'inherit'};
`;

export const H3 = styled.h3<{
	align?: TAlign;
	transform?: CSSProperties['textTransform'];
}>`
	font-size: 18px;
	line-height: 28px;
	font-weight: 700;
	text-align: ${({ align }) => align ?? 'center'};
	text-wrap: balance;
	text-transform: ${({ transform }) => transform ?? 'inherit'};
`;

const paragraphSizes = {
	xsmall: {
		fz: 12,
		lh: 14,
	},
	small: {
		fz: 14,
		lh: 18,
	},
	medium: {
		fz: 16,
		lh: 20,
	},
	large: {
		fz: 18,
		lh: 24,
	},
};

export const P = styled.p<{
	align?: TAlign;
	size?: 'large' | 'medium' | 'small' | 'xsmall';
	transparent?: boolean;
	multiline?: boolean;
	weight?: CSSProperties['fontWeight'];
	transform?: CSSProperties['textTransform'];
}>`
	font-size: ${({ size = 'large' }) => `${paragraphSizes[size].fz}px`};
	line-height: ${({ size = 'large' }) => `${paragraphSizes[size].lh}px`};
	font-weight: ${({ weight }) => weight ?? 400};
	text-align: ${({ align }) => align ?? 'center'};
	white-space: ${({ multiline }) => (multiline ? 'pre-wrap' : 'inherit')};
	color: ${({ transparent = false }) =>
		transparent ? `var(--color-white-05)` : 'inherit'};
	text-transform: ${({ transform }) => transform ?? 'inherit'};
	a {
		color: var(--color-white);
		&:hover {
			text-decoration: underline;
		}
	}
`;

export const ContentContainer = styled.div<{ gap?: number }>`
	display: flex;
	flex-flow: column nowrap;
	gap: ${({ gap = 16 }) => `${gap}px`};
`;

export const DiscountBadge = styled.span`
	position: absolute;
	left: 50%;
	top: -10px;
	width: max-content;
	padding: 4px 10px;
	font-weight: 700;
	font-size: 9.3px;
	z-index: 1;
	text-transform: uppercase;
	border-radius: 7px;
	background: var(--light-blue-bg);
	transition: opacity 0.2s, transform 0.2s;
	transform: translateX(-50%);
	&:empty {
		display: none;
	}
`;
