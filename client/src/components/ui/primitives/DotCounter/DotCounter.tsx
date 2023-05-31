import styles from './DotCounter.module.scss';
import { FC } from 'react';

interface DotCounterProps {
	number: number;
}

const DotCounter: FC<DotCounterProps> = ({ number }) => {
	return <div className={styles.circle}>{number}</div>;
};

export default DotCounter;
