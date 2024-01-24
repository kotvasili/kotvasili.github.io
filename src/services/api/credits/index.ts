import { env } from 'next-runtime-env';

import { api } from '~services/api';
import {
	TShop,
	TShopItem,
	TUserBalance,
	TUserShopInfo,
} from '~services/api/credits/types';
import { TBotPaymentOptionType } from '~services/api/dialogs/types';
import { taxApi } from '~services/taxApi';
import { TVATRequestBodyItem, VatType } from '~services/taxApi/types';
import { wsEvents } from '~services/websocket';
import { isEventType, WsEventType } from '~services/websocket/types';
import { replaceNetWithGrossPrices, sortShopProducts } from '~utils/payments';

import { RootState } from '../../../store';

const prefix = '/credits';

export const creditsApi = api.injectEndpoints({
	endpoints: (build) => ({
		balance: build.query<TUserBalance, { id: string }>({
			query: ({ id }) => ({
				url: `${prefix}/accounts/${id}/balance`,
			}),
			async onCacheEntryAdded(
				{},
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				let eventSub = null;
				try {
					await cacheDataLoaded;

					eventSub = wsEvents.events$.subscribe((event) => {
						if (
							isEventType(
								event,
								WsEventType.BalanceChanged,
								WsEventType.NeuronsReceived
							)
						) {
							updateCachedData((draft) => {
								draft.balance = event.payload.balance;
							});
						}
					});
				} catch (err) {}

				await cacheEntryRemoved;
				eventSub?.unsubscribe();
			},
		}),
		shop: build.query<TShop, void>({
			async queryFn(_, _queryApi, _extraOptions, fetchWithBQ) {
				const {
					auth: {
						info: { id },
					},
				} = _queryApi.getState() as RootState;
				const [
					{ data: userShopData, error: userShopDataError },
					productsResponse,
				] = await Promise.all([
					fetchWithBQ(`/exo/moto/${id}/details`), // user ip and token for moto form
					fetchWithBQ(`${prefix}/mall/${id}/credits?shop=web`),
				]);
				const error = productsResponse.error || userShopDataError;
				if (error) {
					return { error };
				}
				const products = productsResponse.data as Array<TShopItem>;
				const userData: TUserShopInfo = (userShopData as TUserShopInfo) ?? {
					userIp: '',
					token: '',
				};

				const vatRequestBody: TVATRequestBodyItem[] = products.map((item) => ({
					amount: item.price,
					ip: userData.userIp,
					projectId: env('NEXT_PUBLIC_MOTO_MERCHANT_ID') ?? '',
					priceType: VatType.Net,
					userId: id,
				}));
				//types are not correct below
				// @ts-ignore
				const { data: vatData, error: vatError } = await _queryApi.dispatch(
					taxApi.endpoints.productPricesWithVAT.initiate(vatRequestBody)
				);
				if (vatError) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					return { error: vatError };
				}
				replaceNetWithGrossPrices(products, vatData);

				return {
					data: sortShopProducts(products, userData),
				};
			},
		}),
		buyBot: build.mutation<
			undefined,
			{ id: string; botId: string | number; type: TBotPaymentOptionType }
		>({
			query: ({ id, botId, type }) => ({
				url: `/ai/chats/userId/${id}/botId/${botId}/buy`,
				method: 'POST',
				body: {
					type,
				},
			}),
		}),
	}),
});

export const { useBalanceQuery, useShopQuery, useBuyBotMutation } = creditsApi;
