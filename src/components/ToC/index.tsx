import { FC } from 'react';

import { TOCWrapper } from '~components/ToC/ToC.styles';
import { PPurl, RefundUrl, SupportUrl, TOCurl } from '~constants/links';

type TLinksProps = {
	refund?: boolean;
};
export const ToC: FC<TLinksProps> = ({ refund = false }) => {
	return (
		<TOCWrapper size="small" className="ToC" transparent>
			<a href={TOCurl} target="_blank">
				Terms of Service
			</a>
			<a href={PPurl} target="_blank">
				Privacy Policy
			</a>
			<a href={SupportUrl} target="_blank">
				Support
			</a>
			{refund ? (
				<a href={RefundUrl} target="_blank">
					Refund Policy
				</a>
			) : null}
		</TOCWrapper>
	);
};
