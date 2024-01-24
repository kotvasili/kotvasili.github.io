import { styled } from '@linaria/react';

import { hoverable } from '~theme/snippets';

export const ItemOuter = styled.div<{ selected: boolean }>`
	display: grid;
	grid-gap: 8px;
	grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
	align-content: center;
	justify-content: space-between;
	position: relative;
	font-size: 16px;
	line-height: 18px;
	border-radius: 30px;
	background-color: var(--color-black-2);
	padding: 14px 18px;
	border: 2px solid;
	border-color: ${({ selected }) =>
		selected ? 'var(--color-white)' : 'var(--color-black-2)'};
	transition: border-color 0.2s;
	${hoverable};
`;

const BaseText = styled.p``;
export const ItemPeriod = styled(BaseText)`
	grid-column: 1 / 2;
	grid-row: 1;
`;

export const ItemPrice = styled(BaseText)`
	grid-column: 1 / 2;
	grid-row: 2;
	font-weight: 600;
	font-size: 18px;
`;

export const ItemMonthly = styled(BaseText)`
	grid-column: 2;
	grid-row: 1/3;
	align-self: center;
	justify-self: end;
`;

export const ItemDiscount = styled.div`
	position: absolute;
	left: 50%;
	top: -16px;
	padding: 5px 20px;
	font-size: 13px;
	transform: translateX(-50%);
	font-weight: 600;
	text-transform: uppercase;
	text-align: center;
	border-radius: 100px;
	background: var(--promo-bg);
	width: max-content;
	&:empty {
		display: none;
	}
`;
