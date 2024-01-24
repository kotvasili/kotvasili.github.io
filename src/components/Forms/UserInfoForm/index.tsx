import React, { useCallback, useMemo } from 'react';
import { Form, SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '~components/Button';
import { validateDoB } from '~components/Forms/common/validators';
import { FormInput } from '~components/Forms/Input';
import { FormSelect } from '~components/Forms/Select';
import { Loader } from '~components/Loader';
import { notificationTextConfig } from '~components/NotificationEventListener/notificationTextConfig';
import { Toaster } from '~components/Toaster';
import { genderOptions } from '~constants/forms';
import { useAuthContext } from '~context/auth';
import { useEditUserInfoMutation, useUserInfoQuery } from '~services/api/user';
import type { TGender } from '~services/api/user/types';
import { FormGrid } from '~theme/snippets';
import {
	dateNowInput,
	isoToDateInput,
	jsDateToInput,
	jsDateToIso,
} from '~utils/dates';

type TUserInfoFields = {
	name: string;
	gender: TGender;
	birthday: string;
};

export const UserInfoForm = () => {
	const { id } = useAuthContext();
	const { data, isSuccess } = useUserInfoQuery({ id });
	// @ts-ignore
	const defaultValues: TUserInfoFields = useMemo(
		() => ({
			name: data?.name,
			gender: data?.gender,
			// @ts-ignore
			birthday: isoToDateInput(data?.birthday),
		}),
		[data?.birthday, data?.gender, data?.name]
	);
	return !isSuccess ? (
		<Loader />
	) : (
		<UserInfoFormContent defaultValues={defaultValues} id={id} />
	);
};

const UserInfoFormContent = ({
	defaultValues,
	id,
}: {
	defaultValues: TUserInfoFields;
	id: string;
}) => {
	const [updateInfo] = useEditUserInfoMutation();
	const {
		reset,
		control,
		register,
		formState: { errors, isSubmitting, isValid, dirtyFields },
		handleSubmit,
	} = useForm<TUserInfoFields>({
		defaultValues,
		mode: 'onChange',
		reValidateMode: 'onChange',
	});
	const isDirtyAlt = !!Object.keys(dirtyFields).length;
	const onSubmit: SubmitHandler<TUserInfoFields> = useCallback(
		async (values) => {
			return updateInfo({
				id,
				data: {
					...values,
					birthday: jsDateToIso(values.birthday as unknown as Date),
				},
			})
				.unwrap()
				.then(() => {
					reset({
						...values,
						birthday: jsDateToInput(values.birthday as unknown as Date),
					});
					Toaster.showSuccess(notificationTextConfig.user.infoUpdateSuccess);
				})
				.catch(() => {
					Toaster.showError(notificationTextConfig.errors.default);
				});
		},
		[id, reset, updateInfo]
	);
	return (
		<>
			<Form control={control} className={FormGrid}>
				<FormInput<TUserInfoFields>
					name="name"
					register={register}
					label="Name or nickname"
					placeholder="Your name"
					width={50}
					disabled={isSubmitting}
					type="text"
					rules={{ required: 'Field cannot be empty' }}
					error={errors?.name}
				/>
				<FormSelect<TUserInfoFields>
					name="gender"
					register={register}
					label="Identity"
					disabled={isSubmitting}
					width={50}
					options={genderOptions}
					rules={{ required: 'Field cannot be empty' }}
				/>
				<FormInput<TUserInfoFields>
					name="birthday"
					register={register}
					label="Birthday"
					placeholder="DD/MM/YYYY"
					disabled={isSubmitting}
					width={100}
					type="date"
					min="1900-01-02"
					max={dateNowInput}
					rules={{
						required: 'Field cannot be empty',
						valueAsDate: true,
						validate: validateDoB,
					}}
					error={errors?.birthday}
				/>
			</Form>
			<Button
				text="Save changes"
				onClick={handleSubmit(onSubmit)}
				disabled={!isDirtyAlt || !isValid}
				loading={isSubmitting}
			/>
		</>
	);
};
