import { FC, PropsWithChildren } from 'react';

import { BTN } from '~components/Button/Button.styles';
import { Loader } from '~components/Loader';

type TButtonProps = {
	disabled?: boolean;
	text: string;
	type?: 'primary' | 'secondary';
	onClick?: () => void;
	loading?: boolean;
	grow?: 0 | 1;
	className?: string;
};
export const Button: FC<PropsWithChildren & TButtonProps> = ({
	type = 'primary',
	disabled = false,
	loading = false,
	onClick,
	text,
	grow = 0,
	children,
	className = '',
}) => {
	return (
		<BTN
			className={`${type} ${loading ? 'loading' : ''} ${className}`}
			onClick={onClick}
			disabled={disabled}
			grow={grow}
		>
			{loading ? (
				<Loader size={25} />
			) : (
				<>
					<span>{text}</span>
					{children}
				</>
			)}
		</BTN>
	);
};
