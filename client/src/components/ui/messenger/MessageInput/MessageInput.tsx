'use client';

import styles from './MessageInput.module.scss';
import { forwardRef } from 'react';
import { BiSend } from 'react-icons/bi';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

import HStack from '@/components/containers/Stack/HStack/HStack';
import Icon from '@/components/ui/primitives/Icon/Icon';
import AttachmentButton from '@/components/ui/primitives/buttons/AttachmentButton/AttachmentButton';
import Button from '@/components/ui/primitives/buttons/SubmitButton/Button';

import useTyping from '@/hooks/socket/useTyping';

interface MessageInputProps extends TextareaAutosizeProps {
	handleSendMessage: () => void;
}

const MessageInput = forwardRef<HTMLTextAreaElement, MessageInputProps>(
	({ handleSendMessage, ...props }, ref) => {
		const { handleChange } = useTyping();

		return (
			<HStack className={styles.container}>
				<AttachmentButton onChange={() => console.log(123)} />
				<TextareaAutosize
					{...props}
					minRows={1}
					maxRows={10}
					className={styles.textarea}
					placeholder={'Напишите сообщение...'}
					ref={ref}
					onChange={handleChange}
				/>
				<Button variant={'ghost'} onClick={handleSendMessage}>
					<Icon icon={BiSend} size={24} />
				</Button>
			</HStack>
		);
	}
);

MessageInput.displayName = 'MessageInput';

export default MessageInput;
