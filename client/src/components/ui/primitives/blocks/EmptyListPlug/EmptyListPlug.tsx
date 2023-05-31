import styles from './EmptyListPlug.module.scss';

import VStack from '@/components/containers/Stack/VStack/VStack';

const EmptyListPlug = ({ text }: { text: string }) => {
	return (
		<VStack className={styles.container}>
			<p className={styles.text}>{text}</p>
		</VStack>
	);
};

export default EmptyListPlug;
