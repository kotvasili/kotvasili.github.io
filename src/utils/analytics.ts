import { TShopItem } from '~services/api/credits/types';
import { formatCash } from '~utils/payments';

export const transformShopItemToGTMData = (
	item: TShopItem,
	omitListInfo = false
) => {
	const isSubscription = item.meta.Subscription;
	const { price, sku, amount } = item;
	if (isSubscription) {
		const listInfo = omitListInfo
			? {}
			: {
					item_list_name: 'premium_features',
					item_list_id: 'pf',
			  };
		return {
			price: price.toString(),
			item_id: sku,
			item_name: sku.split('.')[4] + 'onth',
			item_category: 'membership',
			...listInfo,
		};
	}
	const listInfo = omitListInfo
		? {}
		: {
				item_list_name: 'neurons',
				item_list_id: 'nr',
		  };
	return {
		item_name: `${formatCash(amount)}neurons`,
		item_id: sku,
		price: price.toString(),
		item_category: 'coinpack',
		...listInfo,
	};
};
