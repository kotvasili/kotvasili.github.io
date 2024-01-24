import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { DiscountBadge } from '~components/Typography';
import { coverDiv, hoverable } from '~theme/snippets';

export const NeuronImg = css`
	transition: opacity 0.2s;
	grid-area: 1 / 1;
	pointer-events: none;
	user-select: none;
`;

export const ImgContainer = styled.div`
	display: grid;
	grid-template-rows: min-content;
	margin-top: 11px;
	@media screen and (max-width: 360px) {
		.${NeuronImg} {
			max-width: 90px;
			height: auto;
		}
	}
`;
export const NeuronItemOuter = styled.div<{ active: boolean }>`
	background-color: var(--color-black-02);
	position: relative;
	padding: 5px;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	flex-basis: 33.33%;
	max-width: 120px;
	border-radius: 30px;
	background-clip: content-box;

	p:last-child {
		margin-bottom: 11px;
	}
	&:after {
		content: '';
		z-index: -1;
		${coverDiv};
		border-radius: 30px;
		padding: 2px;
		background: var(--light-blue-bg);
		mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		transition: transform 0.2s, opacity 0.2s;
		transform: scale(${({ active }) => (active ? 1 : 0.95)});
		opacity: ${({ active }) => (active ? 1 : 0)};
	}
	${hoverable};
	.${NeuronImg}:first-child {
		mix-blend-mode: luminosity;
		opacity: ${({ active }) => (active ? 0 : 1)};
		transition-delay: ${({ active }) => (active ? 0 : 0.2)};
	}
	.${NeuronImg}:last-child {
		opacity: ${({ active }) => (active ? 1 : 0)};
		transition-delay: ${({ active }) => (active ? 0.5 : 0)};
	}
	${DiscountBadge} {
		opacity: ${({ active }) => (active ? 1 : 0)};
		transform: translateX(-50%) scale(${({ active }) => (active ? 1 : 0.95)});
	}
`;

export const BaseText = styled.p`
	font-size: 16px;
	text-align: center;
	white-space: pre;
	font-weight: 700;
`;

export const Price = styled(BaseText)`
	font-weight: 600;
	color: var(--brand-blue-light);
`;
