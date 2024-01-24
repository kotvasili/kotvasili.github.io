import { DetailedHTMLProps, forwardRef, SelectHTMLAttributes } from 'react';

import {
	InputMessage,
	InputName,
	InputShadow,
	inputStyles,
	InputWrapper,
} from '~components/Forms/common/Input.common.styles';
import type { TSelectOptions } from '~components/Forms/common/types';
import { FormInputProps } from '~components/Forms/common/types';
import { InputElem, SelectArrow } from '~components/Forms/Select/Select.styles';

import ArrowBack from '../../../../public/assets/icons/arrowBack.svg';

export type SelectProps = {
	label: string;
	name: string;
} & DetailedHTMLProps<
	SelectHTMLAttributes<HTMLSelectElement>,
	HTMLSelectElement
>;
export const Select = forwardRef<
	HTMLSelectElement,
	SelectProps & { options: TSelectOptions }
>(({ name, label, disabled, options, placeholder, ...props }, ref) => {
	return (
		<>
			<InputName>{label}</InputName>
			<InputElem
				className={inputStyles}
				ref={ref}
				name={name}
				disabled={disabled}
				{...props}
			>
				<option value="" disabled>
					{placeholder || 'Select...'}
				</option>
				{options.map(({ name, value }) => {
					return (
						<option key={value} value={value}>
							{name}
						</option>
					);
				})}
			</InputElem>
			<SelectArrow>
				<ArrowBack />
			</SelectArrow>
			<InputShadow />
		</>
	);
});

export const FormSelect = <TFormValues extends Record<string, unknown>>({
	name,
	register,
	rules,
	error,
	width,
	description,
	...props
}: FormInputProps<TFormValues>) => {
	const hasError = !!error;

	return (
		<InputWrapper className={hasError ? 'error' : ''} width={width}>
			{/*// @ts-ignore*/}
			<Select
				name={name}
				aria-invalid={hasError}
				{...(register && register(name, rules))}
				{...props}
			/>
			<InputMessage>{hasError ? error?.message : description}</InputMessage>
		</InputWrapper>
	);
};

Select.displayName = 'Select';
