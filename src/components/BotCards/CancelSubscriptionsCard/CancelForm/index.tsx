import React, { FC, useCallback, useMemo } from 'react';
import { Form, SubmitHandler, useForm } from 'react-hook-form';

import { FormWrapper } from '~components/BotCards/CancelSubscriptionsCard/CancelForm/CancelForm.styles';
import { Button } from '~components/Button';
import { FormInput } from '~components/Forms/Input';
import { notificationTextConfig } from '~components/NotificationEventListener/notificationTextConfig';
import { Toaster } from '~components/Toaster';
import { useCancelSubscriptionMutation } from '~services/api/subscriptions';
import { TSubscriptionItemExtended } from '~services/api/subscriptions/types';
import { FormGrid } from '~theme/snippets';

import { useSelector } from '../../../../store';
import { getUserId } from '../../../../store/auth/authSlice';

type TCancelFields = {
	reason: string;
};
export const CancelForm: FC<{
	currentItem: TSubscriptionItemExtended;
	onSuccess: () => void;
}> = ({ currentItem, onSuccess }) => {
	const id = useSelector(getUserId);
	const {
		reset,
		control,
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
	} = useForm<TCancelFields>({
		mode: 'onChange',
		reValidateMode: 'onChange',
	});
	const [cancel] = useCancelSubscriptionMutation();

	const isMain = useMemo(
		() => currentItem.botUid === 'main',
		[currentItem.botUid]
	);
	const toastText = useMemo(
		() => ({
			title: `Your ${
				isMain ? 'Premium plan' : `${currentItem.botName} access`
			} renewal is deactivated.`,
		}),
		[currentItem.botName, isMain]
	);

	const onSubmit: SubmitHandler<TCancelFields> = useCallback(
		async (values) => {
			return cancel({
				id,
				body: {
					reason: values.reason,
					sku: currentItem.sku,
					externalSystem: currentItem.externalSystem,
				},
			})
				.unwrap()
				.then(() => {
					reset();

					Toaster.showSuccess(toastText);
					return onSuccess();
				})
				.catch(() => {
					Toaster.showError(notificationTextConfig.errors.default);
				});
		},
		[
			cancel,
			currentItem.externalSystem,
			currentItem.sku,
			id,
			onSuccess,
			reset,
			toastText,
		]
	);
	return (
		<FormWrapper>
			<Form control={control} className={FormGrid}>
				<FormInput<TCancelFields>
					name="reason"
					register={register}
					label="Please tell us why do you want to cancel?"
					placeholder="Don’t like the..."
					width={100}
					disabled={isSubmitting}
					type="text"
					error={errors?.reason}
					description="Note that you will keep using Premium features until your current paid Premium expired"
				/>
			</Form>
			<Button
				text="Yes, cancel auto renewal"
				onClick={handleSubmit(onSubmit)}
				disabled={isSubmitting}
				loading={isSubmitting}
			/>
			<Button
				type="secondary"
				text="No, I’ll keep my Premium"
				onClick={onSuccess}
				disabled={isSubmitting}
				loading={isSubmitting}
			/>
		</FormWrapper>
	);
};
