import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import {
	FieldError,
	FieldValues,
	Path,
	RegisterOptions,
	UseFormRegister,
} from 'react-hook-form';

export type TInputProps = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> & {
	label?: string;
	disabled?: boolean;
	placeholder?: string;
	description?: string;
	width?: number;
	type?:
		| 'text'
		| 'radio'
		| 'email'
		| 'password'
		| 'select'
		| 'checkbox'
		| 'date';
};
export type FormInputProps<TFormValues extends FieldValues = FieldValues> = {
	name: Path<TFormValues>;
	rules?: RegisterOptions;
	register?: UseFormRegister<TFormValues>;
	error?: FieldError;
	options?: TSelectOptions;
} & Omit<TInputProps, 'name' | 'options'>;

export type TSelectOption = {
	name: string;
	value: string;
};

export type TSelectOptions = TSelectOption[];
