'use client';

import styles from './ProfleCard.module.scss';

import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';

const UserBackgroundImage = ({ src }: { src: string }) => {
	return (
		<CustomImage
			src={src}
			width={1400}
			height={1400}
			alt={'background'}
			className={styles.background}
		/>
	);
};

export default UserBackgroundImage;
