'use client';

import styles from './Scrollable.module.scss';
import { cn } from '@/utils/helpers/cn.helper';
import { FC, HTMLAttributes, PropsWithChildren, useRef } from 'react';

interface ScrollableProps extends HTMLAttributes<HTMLDivElement> {
	axis: 'x' | 'y';
	reverse?: boolean;
}

const Scrollable: FC<PropsWithChildren<ScrollableProps>> = ({ children, axis, className, reverse, ...props }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
		document.body.classList.remove(`block-scroll`);
	};

	const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
		document.body.classList.add(`block-scroll`);
	};

	const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
		if (!containerRef.current) return;
		if (axis === 'x') containerRef.current.scrollLeft += event.deltaY / 4;
		else if (axis === 'y') containerRef.current.scrollTop += event.deltaY / 4;
	};

	return (
		<div
			ref={containerRef}
			className={cn(className, styles.container, {
				[styles.vertical]: axis === 'y',
				[styles.horizontal]: axis === 'x',
				[styles.reverse]: reverse
			})}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onWheel={handleWheel}
		>
			{children}
		</div>
	);
};

export default Scrollable;
