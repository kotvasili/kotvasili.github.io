import { cx } from '@linaria/core';
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

import {
	InputElem,
	InputMessage,
	InputName,
	InputShadow,
	inputStyles,
	InputWrapper,
} from '~components/Forms/common/Input.common.styles';
import { FormInputProps } from '~components/Forms/common/types';

export type InputProps = {
	label?: string;
	name: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{ name, label, type = 'text', disabled, placeholder, className, ...props },
		ref
	) => {
		return (
			<>
				{label && <InputName>{label}</InputName>}
				<InputElem
					className={cx(inputStyles, className)}
					ref={ref}
					name={name}
					disabled={disabled}
					type={type}
					placeholder={placeholder}
					{...props}
				/>
				<InputShadow />
			</>
		);
	}
);

export const FormInput = <TFormValues extends Record<string, unknown>>({
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
			<Input
				name={name}
				aria-invalid={hasError}
				{...(register && register(name, rules))}
				{...props}
			/>
			<InputMessage>{hasError ? error?.message : description}</InputMessage>
		</InputWrapper>
	);
};

Input.displayName = 'Input';
