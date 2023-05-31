'use client';

import styles from './Icon.module.scss';
import { cn } from '@/utils/helpers/cn.helper';
import { FC } from 'react';
import { IconBaseProps, IconType } from 'react-icons';

interface IconProps extends IconBaseProps {
	icon: IconType;
}

const Icon: FC<IconProps> = ({ icon, children, className, size = 22, ...props }) => {
	const Icon = icon;
	return (
		<Icon size={size} className={cn(styles.icon, className)} {...props}>
			{children}
		</Icon>
	);
};

export default Icon;
