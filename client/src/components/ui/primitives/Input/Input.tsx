'use client';

import { cn } from '@/utils/helpers/cn.helper';
import { HTMLAttributes, HTMLInputTypeAttribute, forwardRef } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
	type: HTMLInputTypeAttribute;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ children, className, ...props }, ref) => {
		return (
			<HStack
				className={cn(
					'gap-3 items-center focus:border-0 bg-hover-light dark:bg-hover-dark bg-opacity-10 rounded-md px-3 w-full',
					className
				)}
			>
				{children}
				<input
					ref={ref}
					{...props}
					className={'outline-0 bg-transparent h-fit w-full py-2'}
				/>
			</HStack>
		);
	}
);

Input.displayName = 'Input';

export default Input;
