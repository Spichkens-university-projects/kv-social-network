'use client';

import styles from './Popup.module.scss';
import { cn } from '@/utils/helpers/cn.helper';
import { HTMLAttributes, useCallback, useRef } from 'react';

import useClickOutside from '@/hooks/local/useOnClickOutside';

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
	isOpen: boolean;
	onClose?: () => void;
}

const Popup = ({ isOpen, children, className, onClose, ...props }: PopupProps) => {
	const ref = useRef<HTMLDivElement>(null);

	const handleClosePopup = useCallback(() => {
		onClose && onClose();
	}, [onClose]);

	useClickOutside(ref, handleClosePopup);

	return isOpen ? (
		<div ref={ref} {...props} className={cn(styles.container, className)}>
			{children}
		</div>
	) : null;
};

export default Popup;
