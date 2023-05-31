'use client';

import styles from './AttachmentButton.module.scss';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ChangeEvent, FC, ReactNode, useRef } from 'react';
import { AiOutlinePaperClip } from 'react-icons/ai';

import Icon from '@/components/ui/primitives/Icon/Icon';

interface AttachmentButtonProps {
	children?: ReactNode;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AttachmentButton: FC<AttachmentButtonProps> = ({ children, onChange }) => {
	const ref = useRef<HTMLInputElement>(null);
	const [animationRef] = useAutoAnimate();

	const handleOpenFileManager = () => ref?.current?.click();

	return (
		<div ref={animationRef} onClick={handleOpenFileManager}>
			<input hidden={true} type='file' accept={'image/*'} ref={ref} onChange={onChange} />
			{children ? children : <Icon icon={AiOutlinePaperClip} className={styles.clip} size={32} />}
		</div>
	);
};

export default AttachmentButton;
