import { memo, useCallback } from 'react';

import { AVAILABLE_TOPIC_ICONS } from '~constants/topics';
import { TTopic } from '~services/api/topics/types';

import {
	Background,
	Container,
	Icon,
	Processing,
	ProcessingContainer,
	Title,
} from './Topic.styles';

type Props = {
	topic: TTopic;
	processing?: boolean;
	disabled?: boolean;
	onClick?: (id: string) => void;
};

export const Topic = memo<Props>(({ topic, processing, disabled, onClick }) => {
	const { Id, Icon: icon, Name, BackgroundColor } = topic;
	const hasIcon = AVAILABLE_TOPIC_ICONS.includes(icon);
	const clickable = !!onClick && !disabled && !processing;

	const handleClick = useCallback(() => {
		onClick?.(Id);
	}, [Id, onClick]);

	return (
		<Container
			hasIcon={hasIcon}
			className={`${clickable ? 'clickable' : ''} ${
				BackgroundColor ? Background : ''
			}`}
			onClick={clickable ? handleClick : undefined}
		>
			{hasIcon && (
				<Icon src={`/img/topics/${icon}.png`} width={28} height={28} alt="I" />
			)}
			<Title
				disabled={disabled}
				visible={!processing}
				transform="capitalize"
				size="medium"
				weight={500}
			>
				{Name}
			</Title>
			{processing && (
				<ProcessingContainer hasIcon={hasIcon}>
					<Processing />
				</ProcessingContainer>
			)}
		</Container>
	);
});
Topic.displayName = 'Topic';
