'use client';

import styles from './SearchField.module.scss';
import { FC, HTMLAttributes, forwardRef } from 'react';
import { BiSearch } from 'react-icons/bi';

import HStack from '@/components/containers/Stack/HStack/HStack';
import Icon from '@/components/ui/primitives/Icon/Icon';

interface SearchFieldProps extends HTMLAttributes<HTMLInputElement> {}

const SearchField: FC<SearchFieldProps> = forwardRef<HTMLInputElement, SearchFieldProps>(({ ...props }, ref) => {
	return (
		<HStack className={styles.container}>
			<Icon icon={BiSearch} color={'#ADADAD'} />
			<input {...props} ref={ref} type='text' className={styles.input} placeholder={'Поиск'} />
		</HStack>
	);
});

SearchField.displayName = 'SearchField';

export default SearchField;
