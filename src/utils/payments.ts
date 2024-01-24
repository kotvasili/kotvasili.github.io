import {
	TParsedPeriod,
	TShop,
	TShopItem,
	TShopSubscription,
	TUserShopInfo,
} from '~services/api/credits/types';
import {
	TBotAvailabilityConditions,
	TBotAvailabilityPaymentOption,
	TBotAvailabilityPostConditions,
	TBotPaymentOptionType,
	TBotPaymentType,
	TMessageTarificationType,
} from '~services/api/dialogs/types';
import { TVATResponseItem } from '~services/taxApi/types';

export function parseSubscriptionPeriod(periodString: string): TParsedPeriod {
	//no info about recurring period => fallback to sku to get months
	const regexSku = /(\d+)m\.usd/i;
	const match = periodString.match(regexSku);

	if (match && match[1] && !isNaN(parseInt(match[1], 10))) {
		return {
			years: 0,
			months: parseInt(match[1], 10),
			days: 0,
			hours: 0,
		};
	}

	const botSubscriptionRegExp = /\.subscription.(\d+)m/i;
	const botSubscriptionMatch = periodString.match(botSubscriptionRegExp);

	if (
		botSubscriptionMatch &&
		botSubscriptionMatch[1] &&
		!isNaN(parseInt(botSubscriptionMatch[1], 10))
	) {
		return {
			years: 0,
			months: parseInt(botSubscriptionMatch[1], 10),
			days: 0,
			hours: 0,
		};
	}

	const periodRegex =
		/P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/;
	const matches = periodString.match(periodRegex);
	if (!matches) {
		throw new Error(`Invalid period string: ${periodString}`);
	}

	const [, years, months, days, hours] = matches;
	let swappedYears = years;
	let swappedMonths = months;
	if (years === '1' && months === '0') {
		swappedMonths = '12';
		swappedYears = '0';
	}
	return {
		years: years ? parseInt(swappedYears, 10) : 0,
		months: months ? parseInt(swappedMonths, 10) : 0,
		days: days ? parseInt(days, 10) : 0,
		hours: hours ? parseInt(hours, 10) : 0,
	};
}

export function roundToTwoDigits(value: number): number {
	return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function formatCash(number: number) {
	if (number >= 1000) {
		const rounded = Math.floor(number / 100) * 100;
		const formattedNumber = parseFloat((rounded / 1000).toFixed(1));
		return `${formattedNumber}K`;
	} else {
		return number.toString();
	}
}

type TBotFormattedOption = TBotAvailabilityPaymentOption & {
	textPurchaseInitial: string;
	textPurchasePost: string;
};

type TBotFormattedOptions = Record<TBotPaymentOptionType, TBotFormattedOption>;

export type TBotPaymentOptionsFormatted = {
	paymentType: TBotPaymentType;
	paymentOptionTypes: TBotPaymentOptionType[];
	options: TBotFormattedOptions;
};
export const formatBotPaymentOptions = (
	options?: TBotAvailabilityConditions | TBotAvailabilityPostConditions
): TBotPaymentOptionsFormatted => {
	const paymentType = options?.paymentType;
	const paymentOptionTypes: TBotPaymentOptionType[] = [];
	const payText = options?.paymentOptions.find((item) => item.type === 'level')
		? 'Don’t wait'
		: 'Unlock for';
	const paymentOptions = {};

	options?.paymentOptions.forEach(({ type, value }) => {
		if (!['level', 'neurons', 'subscription'].includes(type)) {
			return;
		}
		const textObj = {
			level: {
				textPurchaseInitial: `Reach level ${value} to unlock`,
				textPurchasePost: `Reach level ${value} to unlock`,
			},
			neurons: {
				textPurchaseInitial: `${payText} ${value}`,
				textPurchasePost: `${payText} ${value}`,
			},
			subscription: {
				textPurchaseInitial: '',
				textPurchasePost: '',
			},
		};
		paymentOptionTypes.push(type);

		// @ts-ignore
		paymentOptions[type] = {
			type,
			value,
			textPurchaseInitial: textObj[type].textPurchaseInitial,
			textPurchasePost: textObj[type].textPurchasePost,
		} as TBotFormattedOption;
	});
	paymentOptionTypes.sort(
		(a, b) => (b === 'level' ? 1 : 0) - (a === 'level' ? 1 : 0)
	);

	return <TBotPaymentOptionsFormatted>{
		paymentType,
		paymentOptionTypes,
		options: paymentOptions,
	};
};

export const transformMessagePaymentType = (
	type: TMessageTarificationType,
	cost: number | undefined,
	isPaid: boolean,
	isOwnMessage: boolean
) => {
	if (isOwnMessage) {
		return ['free'];
	}
	switch (type) {
		case undefined:
			if (isPaid) return ['free'];
			if (!isPaid && cost) return ['purchase'];
			return ['subscription'];
		case 'free':
			return cost ? ['purchase'] : ['free'];
		case 'purchase':
			return ['purchase'];
		case 'subscription':
			return ['subscription'];
		case 'subscription_then_purchase':
			return ['subscription', 'purchase'];
		case 'subscription-bot':
			return ['subscription-bot'];
		case 'subscription-bot_then_purchase':
			return ['subscription-bot', 'purchase'];
	}
};

export const replaceNetWithGrossPrices = (
	products: Array<TShopItem>,
	prices: TVATResponseItem[]
) => {
	const priceMap = new Map(prices.map((price) => [price.net, price.gross]));

	products.forEach((product) => {
		const newPrice = priceMap.get(product.price);
		if (newPrice !== undefined) {
			product.price = newPrice;
		}
	});
};

export const isShowPaid = (
	paymentType: string[],
	cost: number,
	hasSubscription: boolean,
	hasBotSubscription: boolean,
	isPaid: boolean
): boolean => {
	if (paymentType.includes('subscription')) {
		return !hasSubscription || cost > 0;
	}

	if (paymentType.includes('subscription-bot')) {
		return !hasBotSubscription || cost > 0;
	}

	if (paymentType.includes('purchase')) {
		return !isPaid || cost > 0;
	}

	return false;
};

export function extractBotNameFromSku(str: string) {
	const parts = str.split('.subscription');
	const subParts = parts[0].split('.');
	return subParts[subParts.length - 1];
}

export const sortShopProducts = (
	items: Array<TShopItem>,
	userShopInfo: TUserShopInfo
): TShop => {
	const formatted: TShop = {
		...userShopInfo,
		subscriptions: [],
		neurons: [],
		botSubscriptions: {},
	};

	items.forEach((item) => {
		const isSub = item.meta.Subscription;
		if (!isSub) {
			return formatted.neurons.push(item);
		}

		const sub = item as TShopSubscription;
		const { Period, Sku } = sub.meta.Recurring;
		const period = parseSubscriptionPeriod(Period ?? Sku);
		const monthPayment = roundToTwoDigits(item.price / period.months);
		const newSub: TShopSubscription = {
			...sub,
			formatted: { period, monthPayment },
		};

		if (item.sku.includes('membership')) {
			return formatted.subscriptions.push(newSub);
		}

		if (item.sku.includes('subscription')) {
			const botName = extractBotNameFromSku(item.sku);
			formatted.botSubscriptions[botName] ??= [];
			return formatted.botSubscriptions[botName].push(newSub);
		}
	});

	formatted.neurons.sort((a, b) => b.price - a.price);
	formatted.neurons = [
		formatted.neurons[0],
		formatted.neurons[2],
		formatted.neurons[1],
	].filter((item) => item);
	Object.keys(formatted.botSubscriptions).forEach(
		(key) =>
			(formatted.botSubscriptions[key] = [
				formatted.botSubscriptions[key][0],
				formatted.botSubscriptions[key][2],
				formatted.botSubscriptions[key][1],
			].filter((item) => item))
	);

	return formatted;
};

export function extractSubscriptionTarget(sku: string) {
	const regex = /com\.ai\.web\.(\w+)(\.subscription\.1m|\.\d+m)?/;
	const match = sku.match(regex);

	return match ? match[1] : null;
}
