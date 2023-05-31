import styles from './CrossButton.module.scss';
import { FC } from 'react';
import { RxCross2 } from 'react-icons/rx';

import Icon from '@/components/ui/primitives/Icon/Icon';

interface CrossButtonProps {
	cb: () => void;
}

const CrossButton: FC<CrossButtonProps> = ({ cb }) => {
	return <Icon icon={RxCross2} onClick={cb} className={styles.crossButton} size={28} />;
};

CrossButton.displayName = 'CrossButton';

export default CrossButton;
