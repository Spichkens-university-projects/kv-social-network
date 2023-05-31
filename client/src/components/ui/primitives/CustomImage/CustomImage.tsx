import styles from './CustomImage.module.scss';
import defaultAvatar from '@/assets/images/default.png';
import { cn } from '@/utils/helpers/cn.helper';
import Image, { ImageProps, StaticImageData } from 'next/image';
import { FC } from 'react';

interface CustomImageProps extends Omit<ImageProps, 'src'> {
	src?: string | StaticImageData;
}

const CustomImage: FC<CustomImageProps> = ({ src = defaultAvatar, className, ...props }) => {
	return <Image src={src} className={cn(styles.image, className)} {...props} />;
};

export default CustomImage;
