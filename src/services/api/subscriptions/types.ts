export type TSubscriptionItem = {
	endDate: string;
	startDate: string;
	cancelDate?: string;
	externalSystem: 'Moto';
	sku: string;
};

export type TSubscriptionsResponse = {
	subscriptions: TSubscriptionItem[];
};

export type TSubscriptionItemExtended = TSubscriptionItem & {
	botId: number;
	botUid: string;
	botName: string;
};

export type TSubscriptionCancelBody = {
	sku: string;
	externalSystem: string;
	reason?: string;
};
export type TSubBenefitsItem = {
	title: string;
};

export type TSubBenefitsSection = {
	title?: string;
	items: TSubBenefitsItem[];
};

export type TSubscriptionBenefits = {
	benefits: TSubBenefitsSection[];
};
