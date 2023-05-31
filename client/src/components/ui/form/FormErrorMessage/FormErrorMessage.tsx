'use client';

import styles from './FormErrorMessage.module.scss';
import { cn } from '@/utils/helpers/cn.helper';
import { FC, PropsWithChildren } from 'react';

export type FormErrorMessageProps = {
	className?: string;
};

export const FormErrorMessage: FC<PropsWithChildren<FormErrorMessageProps>> = ({ children, className }) => (
	<p className={cn(styles.message, className)}>{children}</p>
);
