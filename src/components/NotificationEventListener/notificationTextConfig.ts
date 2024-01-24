type TNotificationInfo = { title: string; text?: string };
type TTagsConfig = Record<string, TNotificationInfo>;
type TNotificationConfig = {
	user: {
		infoUpdateSuccess: TNotificationInfo;
		cancelSubscriptionSuccess: TNotificationInfo;
	};
	errors: TTagsConfig;
};
export const notificationTextConfig: TNotificationConfig = {
	user: {
		infoUpdateSuccess: {
			title: 'Updated successfully.',
		},
		cancelSubscriptionSuccess: {
			title:
				'Your subscription is cancelled. Current plan is still active until:',
		},
	},
	errors: {
		default: {
			title: 'Something went wrong.',
			text: 'Please try again later.',
		},
	},
};
