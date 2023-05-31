'use client';

import { cn } from '@/utils/helpers/cn.helper';
import Link from 'next/link';
import { FC, HTMLAttributes, ReactNode } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';

import useCurrentPage from '@/hooks/local/useCurrentPage';

interface SelectorMenuItemProps extends HTMLAttributes<HTMLDivElement> {
	title: string;
	link: string;
	children?: ReactNode;
}

const SelectorMenuItem: FC<SelectorMenuItemProps> = ({ link, title, children, className, ...props }) => {
	const { isCurrentPage } = useCurrentPage(link);

	return (
		<VStack
			{...props}
			className={cn(
				'w-full text-center lg:text-left whitespace-nowrap hover-highlight rounded-sm px-2 py-2',
				{
					'bg-hover-light dark:bg-hover-dark': isCurrentPage
				},
				className
			)}
		>
			<Link href={`${link}`}>
				<HStack className={'items-center justify-between'}>
					<p className={'font-medium truncate'}>{title}</p>
					{children}
				</HStack>
			</Link>
		</VStack>
	);
};

export default SelectorMenuItem;
