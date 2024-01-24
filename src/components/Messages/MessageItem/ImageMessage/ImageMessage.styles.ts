import { styled } from '@linaria/react';

export const MSGIMGWrapper = styled.div`
	position: relative;
	width: 160px;
	height: 160px;
	img {
		width: 160px;
		height: 160px;
		object-fit: cover;
		transition: opacity 0.2s;
		overflow: hidden;
		border-radius: 24px;
		&.loading {
			opacity: 0;
		}
		&:not(.loading) + div {
			display: none;
		}
	}
	& > div {
		position: absolute;
		left: 0;
		top: 0;
	}
`;
