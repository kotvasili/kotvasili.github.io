export type TUserBalance = {
	balance: number;
};

export type TUserShopInfo = {
	userIp: string;
	token: string;
};

export type TBotShop = Record<string, TShopBotSubscription[]>;

export type TShop = TUserShopInfo & {
	neurons: TShopNeuronsPack[];
	subscriptions: TShopSubscription[];
	botSubscriptions: TBotShop;
};

export type RecurringSubscriptionInfo = {
	Period: string;
	Price: number;
	Sku: string;
};

export type TShopItem = {
	shop: 'web';
	confirmed: boolean;
	currency: 'usd';
	price: number;
	amount: number;
	sku: string;
	tags: string[];
	meta: TShopItemMeta;
};

export type TShopItemMeta = {
	Introduction: boolean;
	Subscription: boolean;
	Description: string;
};

export type TParsedPeriod = {
	years: number;
	months: number;
	days: number;
	hours: number;
};

export type TSubFormattedData = {
	period: TParsedPeriod;
	monthPayment: number;
};

export type TShopItemSubscriptionMeta = TShopItemMeta & {
	Recurring: RecurringSubscriptionInfo;
};

export type TShopNeuronsPack = TShopItem;

export type TShopSubscription = TShopItem & {
	meta: TShopItemSubscriptionMeta;
	formatted: TSubFormattedData;
};

export type TShopBotSubscription = TShopSubscription;
