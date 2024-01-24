import { memo, useCallback } from 'react';

import { Topic } from '~components/Topic';
import { usePremiumTopicRecived } from '~hooks/usePremiumTopicRecived';
import {
	useInitiateTopic,
	usePremiumTopics,
	useTopics,
} from '~hooks/useTopics';

import { Container, List } from './TopicList.styles';

type Props = {
	recipientId: string;
	onClick: () => void;
};

export const TopicList = memo<Props>(({ recipientId, onClick }) => {
	const topics = useTopics(recipientId);
	const { premiumTopics } = usePremiumTopics(recipientId);
	const [initiateTopic, activeTopicId] = useInitiateTopic(recipientId);

	const initiate = useCallback(
		(id: string) => {
			void initiateTopic(id);
			onClick && onClick();
		},
		[initiateTopic, onClick]
	);

	usePremiumTopicRecived(premiumTopics);

	const views = [...premiumTopics, ...topics].map((topic) => (
		<Topic
			key={topic.Id}
			topic={topic}
			processing={topic.Id === activeTopicId}
			disabled={!!activeTopicId && topic.Id !== activeTopicId}
			onClick={initiate}
		/>
	));

	return (
		<Container>
			<List>{views}</List>
		</Container>
	);
});
TopicList.displayName = 'TopicList';
