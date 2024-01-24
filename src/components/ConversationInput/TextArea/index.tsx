import {
	ChangeEvent,
	createRef,
	forwardRef,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
} from 'react';

import {
	TextAreaInput,
	TextAreaWrapper,
} from '~components/ConversationInput/TextArea/ConversationTextarea.styles';
import { MAX_MESSAGE_LENGTH } from '~constants/dialogs';

type TTextareaProps = {
	value: string;
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	onKeyPress: (e: KeyboardEvent) => void;
};
export const ConversationTextarea = forwardRef<
	{
		focus(): void;
	},
	TTextareaProps
>(({ value, onChange, onKeyPress }, ref) => {
	const inputRef = createRef<HTMLTextAreaElement>();
	// This only tracks the auto-sized height so we can tell if the user has manually resized
	const autoHeight = useRef('');
	useImperativeHandle(
		ref,
		() => {
			return {
				focus() {
					inputRef?.current?.focus();
				},
				blur() {
					inputRef?.current?.blur();
				},
			};
		},
		[inputRef]
	);
	useLayoutEffect(() => {
		if (!inputRef?.current) {
			return;
		}

		if (
			autoHeight.current !== undefined &&
			inputRef.current.style.height !== autoHeight.current
		) {
			// don't auto size if the user has manually changed the height
			return;
		}

		inputRef.current.style.height = 'auto';
		inputRef.current.style.overflow = 'hidden';
		const next = `${inputRef.current.scrollHeight}px`;
		inputRef.current.style.height = next;
		autoHeight.current = next;
		inputRef.current.style.overflow = 'auto';
	}, [value, inputRef, autoHeight]);

	return (
		<TextAreaWrapper>
			<TextAreaInput
				ref={inputRef}
				value={value}
				onChange={onChange}
				// @ts-ignore
				onKeyPress={onKeyPress}
				maxLength={MAX_MESSAGE_LENGTH}
				placeholder={'Type message here'}
				rows={1}
			/>
		</TextAreaWrapper>
	);
});

ConversationTextarea.displayName = 'ConversationTextarea';
