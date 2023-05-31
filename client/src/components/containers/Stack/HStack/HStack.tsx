import styles from './HStack.module.scss';
import { cn } from '@/utils/helpers/cn.helper';
import { HTMLAttributes, forwardRef } from 'react';

interface HStackProps extends HTMLAttributes<HTMLDivElement> {}

const HStack = forwardRef<HTMLDivElement, HStackProps>(({ children, className, ...props }, ref) => {
	return (
		<div ref={ref} {...props} className={cn(styles.hstack, className)}>
			{children}
		</div>
	);
});
HStack.displayName = 'Horizontal Stack';

export default HStack;
