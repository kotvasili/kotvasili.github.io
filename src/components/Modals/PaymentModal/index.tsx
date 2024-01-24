//@ts-ignore
import '@motopays/pay-form/lib/index.js';
import '@motopays/pay-form/lib/styles/styles.css';

import Image from 'next/image';
import { allEnv } from 'next-runtime-env';
import { FC, PropsWithChildren, useCallback, useEffect, useRef } from 'react';
// eslint-disable-next-line import/named
import { v4 as uuidv4 } from 'uuid';

import { IconButton } from '~components/IconButton';
import { Modal } from '~components/Modals/Base';
import {
	PaymentDialog,
	PaymentFooter,
	PaymentFooterCheck,
} from '~components/Modals/PaymentModal/PaymentModal.styles';
import { Toaster } from '~components/Toaster';
import { CheckoutReason } from '~constants/annals';
import { tags } from '~constants/userTags';
import { useAuthContext } from '~context/auth';
import {
	useAnnalsBeginCheckout,
	useAnnalsBeginCheckoutDigitalCopy,
} from '~hooks/annals';
import { useUserTags } from '~hooks/useTags';
import { GTMAnalytics } from '~services/analytics';
import { useShopQuery } from '~services/api/credits';
import { TShopItem } from '~services/api/credits/types';
import { TBotAccountType } from '~services/api/dialogs/types';
import { fadeIn } from '~theme/snippets';

import Close from '../../../../public/assets/icons/close.svg';
const convertToBackendId = (clientUserId: string) => {
	const num = parseInt(clientUserId);
	return ((num % 100) * 10000000000 + num / 100).toFixed(0);
};

type TMotoResponse = {
	detail: {
		action?: {
			name: string;
		};
		ip: string;
		merchant: string;
		order: {
			invoiceId: string;
			details: string;
		};
		payment: {
			paymentId: string;
			state: 'completed' | 'rejected' | 'needAction'; //on of strings: completed, rejected, needAction
			rebillAnchor: string;
			info: {
				completeProcessingTime?: Date;
				currency: string;
				paymentType: string;
				paymentSystem: string;
				paymentRequisites?: string;
				price: number;
			};
			rejectionDetails?: {
				hardDecline: boolean;
				message?: string;
				problemSolvingTips: string[];
				rejectionCode: number;
			};
		};
		taxInfo: {
			abbreviation: string;
			price: number;
			priceNet: number;
			tax: number;
		};
		user: {
			id: string;
		};
		state: 'completed' | 'rejected' | 'needAction';
	};
};

export const PaymentModal: FC<
	{
		item: TShopItem;
		checkoutReason?: CheckoutReason;
		botClientId?: number | string;
		botName?: string;
		botType?: TBotAccountType;
		onSuccess: () => void;
		onClose: () => void;
	} & PropsWithChildren
> = ({
	item,
	checkoutReason,
	botClientId,
	botName,
	botType,
	onSuccess,
	onClose,
}) => {
	const nodaRef = useRef<HTMLDivElement>(null);
	const { id, email } = useAuthContext();
	const userId = convertToBackendId(id);
	const { data, isLoading } = useShopQuery();
	const handleClose = useCallback(() => {
		onClose();
		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		nodaRef?.current.reset();
	}, [onClose]);
	const { userTags } = useUserTags();

	const annalsBeginCheckout = useAnnalsBeginCheckout({
		reason: checkoutReason,
		sku: item.sku,
		botClientId,
		botName,
	});
	const annalsBeginCheckoutDigitalCopy = useAnnalsBeginCheckoutDigitalCopy({
		sku: item.sku,
		botClientId,
		botName,
	});

	const handleSuccess = useCallback(
		(e: Event) => {
			const { detail } = e as unknown as TMotoResponse;

			setTimeout(() => {
				onSuccess();
				handleClose();
			}, 500);

			GTMAnalytics.purchase(
				item,
				detail.payment.paymentId,
				!userTags.includes(tags.customer)
			);

			if (detail.state === 'completed') {
				Toaster.showSuccess({
					title: 'Success!',
					text: `We've received your payment.`,
				});
			} else if (detail.state === 'rejected') {
				Toaster.showError({
					title: 'Payment error',
					text: `We've been unable to process your payment. Try again later or use different payment method.`,
				});
			} else {
				Toaster.showSuccess({
					title: 'Payment processing.',
					text: `Founds will appear on your account as soon as we get confirmation.`,
				});
			}
		},
		[handleClose, item, onSuccess, userTags]
	);

	useEffect(() => {
		GTMAnalytics.beginCheckout(item);
		void annalsBeginCheckout();
		if (botType === 'influencer') {
			void annalsBeginCheckoutDigitalCopy();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!nodaRef.current) return;
		const ref = nodaRef.current;
		ref.addEventListener('close', handleClose);
		return () => {
			ref.removeEventListener('close', handleClose);
		};
	}, [handleClose]);

	useEffect(() => {
		if (!nodaRef.current || isLoading) {
			return;
		}

		const ref = nodaRef.current;
		const {
			NEXT_PUBLIC_PUBLIC_API: apiHost,
			NEXT_PUBLIC_MOTO_ENV: env,
			NEXT_PUBLIC_MOTO_MERCHANT_ID: merchantId,
		} = allEnv();

		const { price: amount, currency, sku, meta } = item;
		const paymentId = uuidv4();
		const description = meta.Description.replace('credits', 'neurons').replace(
			'Journey',
			'EVA AI'
		);
		ref.addEventListener('paid', handleSuccess);
		// @ts-ignore
		ref.payment = {
			customerAuthToken: `Bearer ${data?.token ?? ''}`,
			env,
			merchantId,
			customerId: userId,
			paymentId,
			amount,
			currency,
			ipAddress: data?.userIp,
			initiator: 'Customer',
			orderType: 'Regular',
			amountType: 'Gross',
			email,
			description,
			webhookUrl: `${apiHost ?? ''}/exo/moto/payments`,
			details: {
				description,
				userId,
				sku,
			},
		};

		return () => {
			ref.removeEventListener('paid', handleSuccess);
		};
		//eslint-disable-next-line
	}, [isLoading]);

	return (
		<Modal
			open
			locked={true}
			onClose={handleClose}
			className="fullpage"
			style={{ bottom: 0 }}
		>
			<PaymentDialog className={fadeIn}>
				<IconButton onClick={handleClose}>
					<Close />
				</IconButton>
				{/*	@ts-ignore */}
				<moto-web-pay ref={nodaRef}></moto-web-pay>
				<PaymentFooter>
					<p>
						Novi Limited, reg. number HE 407352, Aglantzias, 62, EKATERINI
						NICOSIA BUSINESS, Flat/Office 213 CENTER, Aglantzia, 2108, Nicosia,
						Cyprus.
					</p>
					<PaymentFooterCheck>
						<Image
							src={'/img/paymentLogos.png'}
							alt={'Visa / Mastercard'}
							width={106}
							height={24}
						/>
						<Image
							src={'/img/vs.jpg'}
							alt={'Visa secure'}
							width={24}
							height={24}
						/>
						<Image
							className="mId"
							src={'/img/mId.png'}
							alt={'MasterCard Id Check'}
							width={76}
							height={24}
						/>
					</PaymentFooterCheck>
				</PaymentFooter>
			</PaymentDialog>
		</Modal>
	);
};
