import { cn } from '@/utils/helpers/cn.helper';
import { ForwardedRef, forwardRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import VStack from '@/components/containers/Stack/VStack/VStack';

interface LazyLoaderProps<T, TArgs> {
	list: T[];
	renderItem: (item: T, index?: number) => JSX.Element;
	getData: () => Promise<void> | void;
	hasNextPage: boolean;
	itemsSpacing?: number;
	reverse?: boolean;
}

const LazyLoader = forwardRef<HTMLDivElement, LazyLoaderProps<any, any>>(
	<T, TArgs>(
		{ list, renderItem, getData, hasNextPage, itemsSpacing, reverse }: LazyLoaderProps<T, TArgs>,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		const { inView, ref: inViewRef } = useInView({
			threshold: 0.1,
			rootMargin: '100px',
			initialInView: false
		});

		useEffect(() => {
			if (inView && hasNextPage) getData();
		}, [inView, hasNextPage]);

		return (
			<VStack>
				<div
					className={cn(`flex flex-col-reverse order-1 gap-${itemsSpacing}`, {
						'order-2': reverse
					})}
				>
					{list ? list.map((item: T, index) => renderItem(item, index)) : null}
				</div>
				<div
					ref={inViewRef}
					className={cn('order-3 w-full', {
						'order-1': reverse
					})}
				/>
				<div
					ref={ref}
					className={cn('h-2 order-1', {
						'order-3': reverse
					})}
				/>
			</VStack>
		);
	}
);

LazyLoader.displayName = 'LazyLoader';

export default LazyLoader;
