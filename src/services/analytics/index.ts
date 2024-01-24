import {
	TShopItem,
	TShopNeuronsPack,
	TShopSubscription,
} from '~services/api/credits/types';
import { transformShopItemToGTMData } from '~utils/analytics';

class GTM {
	user_id: string | null = null;
	setUserId = (id: string) => {
		this.user_id = id;
	};
	viewSubscription = (items: TShopSubscription[]) => {
		window.dataLayer.push({
			event: 'view_item_list',
			user_id: this.user_id,
			ecommerce: {
				items: items.map((item, index) => ({
					...transformShopItemToGTMData(item),
					index: index + 1,
				})),
			},
		});
	};
	viewNeurons = (items: TShopNeuronsPack[]) => {
		window.dataLayer.push({
			event: 'view_item_list',
			user_id: this.user_id,
			ecommerce: {
				items: items.map((item, index) => ({
					...transformShopItemToGTMData(item),
					index: index + 1,
				})),
			},
		});
	};
	selectItem = (item: TShopItem, index: number) => {
		window.dataLayer.push({
			event: 'select_item',
			user_id: this.user_id,
			ecommerce: {
				items: [
					{
						...transformShopItemToGTMData(item),
						index: index + 1,
						quantity: '1',
					},
				],
			},
		});
	};
	beginCheckout = (item: TShopItem) => {
		window.dataLayer.push({
			event: 'begin_checkout',
			user_id: this.user_id,
			ecommerce: {
				items: [
					{
						...transformShopItemToGTMData(item, true),
						quantity: '1',
					},
				],
			},
		});
	};
	purchase = (item: TShopItem, tId: string, isFirst = false) => {
		const firstPurchaseData = isFirst ? { item_category2: 'payment-1st' } : {};
		window.dataLayer.push({
			event: 'purchase',
			user_id: this.user_id,
			currency: item.currency.toUpperCase(),
			value: item.price,
			transaction_id: tId,
			ecommerce: {
				items: [
					{
						...transformShopItemToGTMData(item, true),
						item_variant: item.meta.Subscription ? 'auto' : 'non-recurring',
						...firstPurchaseData,
						quantity: '1',
					},
				],
			},
		});
	};
}

export const GTMAnalytics = new GTM();
