import styles from './PopupItem.module.scss';
import { cn } from '@/utils/helpers/cn.helper';
import { ReactNode } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';

export interface IPopupRenderItem {
	label: string;
	color: string;
	action: () => void;
	children?: ReactNode;
}

const PopupItem = ({ action, color, label, children }: IPopupRenderItem) => {
	return (
		<HStack onClick={action} aria-label={label} className={styles.container}>
			<HStack className={styles.hstack}>
				{children}
				<p className={cn(`text-${color}`, styles.label)}>{label}</p>
			</HStack>
		</HStack>
	);
};

export default PopupItem;
