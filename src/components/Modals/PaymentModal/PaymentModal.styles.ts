import { styled } from '@linaria/react';

import { IconButtonWrapper } from '~components/IconButton/IconButton.styles';

export const PaymentDialog = styled.dialog`
	width: 100%;
	height: 100%;
	background: var(--main-bg);
	border: none;
	outline: none;
	position: relative;
	margin: auto;
	box-shadow: 0 4px 80px rgba(0, 0, 0, 0.5);
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	overflow-x: hidden;
	overflow-y: scroll;

	& > ${IconButtonWrapper} {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1;
	}

	.__ndb-wrapper__ {
		color: var(--color-white);
	}

	.__ndb-header-content {
		border: none !important;
	}

	input {
		background: none;
	}

	noda-web-pay {
		@media screen and (max-width: 600px) {
			padding-top: 25px;
		}
	}

	noda-pay-card-list ~ button {
		color: var(--color-black-1) !important;
	}

	.__ndb-card-more-popup span {
		color: var(--color-black-1);
	}

	noda-loader > div {
		background-color: var(--color-black-05) !important;
	}
`;

export const PaymentFooter = styled.div`
	display: flex;
	flex-flow: row wrap;
	align-items: flex-start;
	justify-content: space-between;
	width: 100%;
	max-width: 504px;
	margin: -16px auto 0;
	padding-bottom: 28px;
	@media screen and (max-width: 769px) {
		max-width: 262px;
		margin: 0 auto;
	}
	p {
		color: #a5aabe;
		font-size: 11px;
		line-height: 1.1;
		font-weight: 500;
		max-width: 100%;
	}
`;

export const PaymentFooterCheck = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
	column-gap: 24px;
	padding-top: 12px;
	.mId {
		background: var(--color-white);
		border-radius: 4px;
	}
`;
