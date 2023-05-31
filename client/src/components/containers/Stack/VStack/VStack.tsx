import styles from './VStack.module.scss';
import { cn } from '@/utils/helpers/cn.helper';
import { HTMLAttributes, forwardRef } from 'react';

interface VStackProps extends HTMLAttributes<HTMLDivElement> {}

const VStack = forwardRef<HTMLDivElement, VStackProps>(
	({ children, className, ...props }, ref) => {
		return (
			<div ref={ref} {...props} className={cn(styles.vstack, className)}>
				{children}
			</div>
		);
	}
);
VStack.displayName = 'VerticalStack';

export default VStack;
