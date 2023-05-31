'use client';

import styles from './SelectorMenu.module.scss';
import { cn } from '@/utils/helpers/cn.helper';
import { HTMLAttributes, ReactNode } from 'react';

import VStack from '@/components/containers/Stack/VStack/VStack';

interface SelectorMenuProps<T> extends HTMLAttributes<HTMLDivElement> {
	list: T[];
	renderItem: (item: T, index: number) => ReactNode;
}

const SelectorMenu = <T,>({ list, renderItem, className }: SelectorMenuProps<T>) => {
	return (
		<VStack className={cn(styles.container, className)}>
			{list.map((item, index) => renderItem(item, index))}
		</VStack>
	);
};

export default SelectorMenu;
