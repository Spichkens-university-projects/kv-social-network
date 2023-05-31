'use client';

import styles from './SubmitButton.module.scss';
import { cn } from '@/utils/helpers/cn.helper';
import { FC, ReactNode } from 'react';

interface SubmitButtonProps {
	children: ReactNode;
	onClick?: () => void;
	variant?: 'primary' | 'secondary' | 'red' | 'ghost';
	className?: string;
	type?: 'submit' | 'button' | 'reset';
	disabled?: boolean;
}

const Button: FC<SubmitButtonProps> = ({
	children,
	onClick,
	variant = 'primary',
	className,
	type = 'button',
	disabled
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={cn(styles.container, className, styles[variant], { [styles.disabled]: disabled })}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
