'use client';

import styles from './Logo.module.scss';

import VStack from '@/components/containers/Stack/VStack/VStack';

const Logo = () => {
	return <VStack className={styles.logo}>KV</VStack>;
};

export default Logo;
