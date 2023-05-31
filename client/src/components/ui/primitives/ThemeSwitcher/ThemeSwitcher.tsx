'use client';

import styles from './ThemeSwitcher.module.scss';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useTheme } from 'next-themes';
import { BiMoon, BiSun } from 'react-icons/bi';

import HStack from '@/components/containers/Stack/HStack/HStack';
import Icon from '@/components/ui/primitives/Icon/Icon';

const ThemeSwitcher = () => {
	const [ref] = useAutoAnimate({ easing: 'ease-in-out' });
	const { resolvedTheme, setTheme } = useTheme();
	const isDark = resolvedTheme === 'dark';

	const handleSwitchTheme = () => setTheme(isDark ? 'light' : 'dark');

	return (
		<HStack ref={ref} onClick={handleSwitchTheme} className={styles.icon}>
			<Icon icon={isDark ? BiMoon : BiSun} size={22} />
		</HStack>
	);
};

export default ThemeSwitcher;
